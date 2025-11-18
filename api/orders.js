const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const orders = await sql`
        SELECT * FROM orders
        ORDER BY created_at DESC
      `;
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        customer_name,
        customer_email,
        total,
        status = 'pending',
        items,
        shipping_address,
        shipping_method,
        tracking_number,
        carrier
      } = req.body;

      const result = await sql`
        INSERT INTO orders (
          id, customer_name, customer_email, total, status, items,
          shipping_address, shipping_method, tracking_number, carrier
        ) VALUES (
          gen_random_uuid()::text, ${customer_name}, ${customer_email}, ${total},
          ${status}, ${JSON.stringify(items)}, ${JSON.stringify(shipping_address)},
          ${shipping_method}, ${tracking_number}, ${carrier}
        )
        RETURNING *
      `;

      res.status(201).json(result[0]);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, status, tracking_number, carrier } = req.body;

      const result = await sql`
        UPDATE orders
        SET status = ${status}, tracking_number = ${tracking_number}, carrier = ${carrier}, updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json(result[0]);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Failed to update order' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}