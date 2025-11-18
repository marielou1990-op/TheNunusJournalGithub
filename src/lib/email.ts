import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export const sendEmail = async (data: EmailData) => {
  try {
    const result = await resend.emails.send({
      from: data.from || 'The Nunus Journal <noreply@thenunusjournal.com>',
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
    return { success: true, result };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

// Email templates
export const emailTemplates = {
  orderConfirmation: (orderData: any) => ({
    subject: `Order Confirmation - Order #${orderData.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B5CF6;">Thank you for your order!</h1>
        <p>Hi ${orderData.customer_name},</p>
        <p>We've received your order and are preparing it for shipment. Here are the details:</p>

        <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3>Order #${orderData.id}</h3>
          <p><strong>Total:</strong> €${orderData.total.toFixed(2)}</p>
          <p><strong>Status:</strong> ${orderData.status}</p>
        </div>

        <h3>Order Items:</h3>
        <ul>
          ${orderData.items.map((item: any) => `
            <li>${item.productTitle} (x${item.quantity}) - €${(item.price * item.quantity).toFixed(2)}</li>
          `).join('')}
        </ul>

        <p>We'll send you another email when your order ships. If you have any questions, please contact us at hello@thenunusjournal.com</p>

        <p>Happy planning!<br>The Nunus Journal Team</p>
      </div>
    `
  }),

  orderShipped: (orderData: any) => ({
    subject: `Your Order Has Shipped - Order #${orderData.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B5CF6;">Your Order Has Shipped!</h1>
        <p>Hi ${orderData.customer_name},</p>
        <p>Great news! Your order has been shipped and is on its way to you.</p>

        <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3>Order #${orderData.id}</h3>
          <p><strong>Tracking Number:</strong> ${orderData.tracking_number || 'To be updated'}</p>
          <p><strong>Carrier:</strong> ${orderData.carrier || 'To be updated'}</p>
        </div>

        <p>You can track your package using the information above. Delivery typically takes 3-7 business days.</p>

        <p>Thank you for shopping with us!<br>The Nunus Journal Team</p>
      </div>
    `
  }),

  newsletterWelcome: (email: string) => ({
    subject: 'Welcome to The Nunus Journal Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B5CF6;">Welcome to our newsletter!</h1>
        <p>Thank you for subscribing to The Nunus Journal newsletter.</p>
        <p>You'll receive updates on:</p>
        <ul>
          <li>New planner stickers and accessories</li>
          <li>Planning tips and tutorials</li>
          <li>Exclusive offers and discounts</li>
          <li>Behind-the-scenes content</li>
        </ul>

        <p>Happy planning!<br>The Nunus Journal Team</p>

        <p style="font-size: 12px; color: #666;">
          You can unsubscribe at any time by clicking the link at the bottom of our emails.
        </p>
      </div>
    `
  }),

  passwordReset: (resetToken: string) => ({
    subject: 'Reset Your Password - The Nunus Journal',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B5CF6;">Reset Your Password</h1>
        <p>You requested a password reset for your The Nunus Journal account.</p>
        <p>Click the button below to reset your password:</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}"
             style="background: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>

        <p>This link will expire in 1 hour for security reasons.</p>
        <p>If you didn't request this reset, please ignore this email.</p>

        <p>The Nunus Journal Team</p>
      </div>
    `
  })
};

export default resend;