const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
      `;
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        title,
        price,
        description,
        short_description,
        image,
        images = [],
        tags = [],
        category,
        in_stock = true,
        stock_count = 0,
        featured = false,
        bestseller = false,
        compatibility = [],
        materials,
        size,
        rating = 0,
        review_count = 0,
        sku,
        weight,
        dimensions,
        shipping_class
      } = req.body;

      const result = await sql`
        INSERT INTO products (
          id, title, price, description, short_description, image, images, tags,
          category, in_stock, stock_count, featured, bestseller, compatibility,
          materials, size, rating, review_count, sku, weight, dimensions, shipping_class
        ) VALUES (
          gen_random_uuid()::text, ${title}, ${price}, ${description}, ${short_description},
          ${image}, ${JSON.stringify(images)}, ${JSON.stringify(tags)}, ${category},
          ${in_stock}, ${stock_count}, ${featured}, ${bestseller}, ${JSON.stringify(compatibility)},
          ${materials}, ${size}, ${rating}, ${review_count}, ${sku}, ${weight},
          ${dimensions}, ${shipping_class}
        )
        RETURNING *
      `;

      res.status(201).json(result[0]);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}