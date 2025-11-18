const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { status, limit = 10, offset = 0 } = req.query;

      let query = sql`
        SELECT * FROM blog_posts
        ORDER BY created_at DESC
      `;

      if (status) {
        query = sql`
          SELECT * FROM blog_posts
          WHERE status = ${status}
          ORDER BY created_at DESC
        `;
      }

      if (limit) {
        query = sql`
          SELECT * FROM blog_posts
          ORDER BY created_at DESC
          LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}
        `;
      }

      const posts = await query;
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        title,
        slug,
        excerpt,
        content,
        featured_image,
        status = 'draft',
        seo_title,
        seo_description,
        tags = [],
        author = 'The Nunus Journal'
      } = req.body;

      const published_at = status === 'published' ? new Date().toISOString() : null;

      const result = await sql`
        INSERT INTO blog_posts (
          id, title, slug, excerpt, content, featured_image, status,
          seo_title, seo_description, tags, author, published_at
        ) VALUES (
          gen_random_uuid()::text, ${title}, ${slug}, ${excerpt}, ${content},
          ${featured_image}, ${status}, ${seo_title}, ${seo_description},
          ${JSON.stringify(tags)}, ${author}, ${published_at}
        )
        RETURNING *
      `;

      res.status(201).json(result[0]);
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ error: 'Failed to create blog post' });
    }
  } else if (req.method === 'PUT') {
    try {
      const {
        id,
        title,
        slug,
        excerpt,
        content,
        featured_image,
        status,
        seo_title,
        seo_description,
        tags,
        author
      } = req.body;

      const published_at = status === 'published' && !req.body.published_at
        ? new Date().toISOString()
        : req.body.published_at;

      const result = await sql`
        UPDATE blog_posts
        SET title = ${title}, slug = ${slug}, excerpt = ${excerpt}, content = ${content},
            featured_image = ${featured_image}, status = ${status},
            seo_title = ${seo_title}, seo_description = ${seo_description},
            tags = ${JSON.stringify(tags)}, author = ${author}, published_at = ${published_at},
            updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      res.status(200).json(result[0]);
    } catch (error) {
      console.error('Error updating blog post:', error);
      res.status(500).json({ error: 'Failed to update blog post' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      const result = await sql`
        DELETE FROM blog_posts
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({ error: 'Failed to delete blog post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}