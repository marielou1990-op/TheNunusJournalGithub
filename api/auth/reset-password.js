const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const { sendEmail, emailTemplates } = require('../../src/lib/email');
const crypto = require('crypto');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      // Check if user exists
      const users = await sql`
        SELECT id, email FROM users WHERE email = ${email}
      `;

      if (users.length === 0) {
        // Don't reveal if email exists or not for security
        return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Update user with reset token
      await sql`
        UPDATE users
        SET reset_token = ${resetToken}, reset_token_expires = ${resetTokenExpires}
        WHERE email = ${email}
      `;

      // Send password reset email
      try {
        const emailData = emailTemplates.passwordReset(resetToken);
        await sendEmail({
          to: email,
          subject: emailData.subject,
          html: emailData.html
        });
      } catch (emailError) {
        console.error('Failed to send password reset email:', emailError);
        return res.status(500).json({ error: 'Failed to send reset email' });
      }

      res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
      console.error('Error requesting password reset:', error);
      res.status(500).json({ error: 'Failed to request password reset' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}