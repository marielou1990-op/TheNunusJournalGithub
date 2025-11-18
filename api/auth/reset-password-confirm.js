const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const bcrypt = require('bcryptjs');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { token, password } = req.body;

      if (!token || !password) {
        return res.status(400).json({ error: 'Token and password are required' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
      }

      // Find user with valid reset token
      const users = await sql`
        SELECT id FROM users
        WHERE reset_token = ${token}
        AND reset_token_expires > NOW()
      `;

      if (users.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
      }

      // Hash new password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Update user password and clear reset token
      await sql`
        UPDATE users
        SET password_hash = ${passwordHash},
            reset_token = NULL,
            reset_token_expires = NULL,
            updated_at = NOW()
        WHERE reset_token = ${token}
      `;

      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Failed to reset password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}