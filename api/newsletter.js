const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const { sendEmail, emailTemplates } = require('../../src/lib/email');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, name } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      // Check if email already exists
      const existing = await sql`
        SELECT id FROM newsletter_subscribers WHERE email = ${email}
      `;

      if (existing.length > 0) {
        return res.status(400).json({ error: 'Email already subscribed' });
      }

      // Add to database
      const result = await sql`
        INSERT INTO newsletter_subscribers (email, name)
        VALUES (${email}, ${name || null})
        RETURNING *
      `;

      // Send welcome email
      try {
        const emailData = emailTemplates.newsletterWelcome(email);
        await sendEmail({
          to: email,
          subject: emailData.subject,
          html: emailData.html
        });
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the subscription if email fails
      }

      res.status(201).json({ message: 'Successfully subscribed to newsletter', subscriber: result[0] });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      res.status(500).json({ error: 'Failed to subscribe to newsletter' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const result = await sql`
        DELETE FROM newsletter_subscribers WHERE email = ${email}
        RETURNING *
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: 'Email not found in newsletter' });
      }

      res.status(200).json({ message: 'Successfully unsubscribed from newsletter' });
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      res.status(500).json({ error: 'Failed to unsubscribe from newsletter' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}