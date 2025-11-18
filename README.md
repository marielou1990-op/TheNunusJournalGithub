# The Nunus Journal - E-commerce Website

A modern, fully-functional e-commerce website for handmade planner stickers built with React, TypeScript, and Vite.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **E-commerce Functionality**: Product catalog, shopping cart, checkout, order management
- **Admin Panel**: Complete admin dashboard for product and order management
- **Authentication**: User authentication with role-based access
- **Responsive Design**: Mobile-first design with modern UI components
- **Database Integration**: Neon PostgreSQL with serverless API routes

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Radix UI + Shadcn/ui components
- **Styling**: Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Database**: Neon PostgreSQL
- **State Management**: React Context + React Query
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/marielou1990-op/TheNunusJournalGithub.git
cd TheNunusJournalGithub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL=your_neon_database_url_here

# Google OAuth (optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Admin Configuration
VITE_ADMIN_EMAIL=your_admin_email@example.com
```

## 🗄️ Database Setup

1. Create a Neon account at https://neon.tech
2. Create a new project and database
3. Copy the connection string to your `.env` file
4. Run the schema:
```bash
# Connect to your Neon database and run:
psql "your_connection_string" -f schema.sql
```

## 📧 Email Setup

1. Create a Resend account at https://resend.com
2. Get your API key from the dashboard
3. Add to your `.env` file: `RESEND_API_KEY=your_api_key_here`
4. Verify your domain in Resend (use your production domain)

**Features included:**
- Order confirmation emails
- Shipping notification emails
- Newsletter subscription
- Password reset emails

## 🚀 Development

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🏗️ Build for Production

```bash
npm run build
```

## 🚀 Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   └── admin/          # Admin-specific components
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── lib/                # Utilities and database connection
├── pages/              # Page components
├── providers/          # Context providers
└── types/              # TypeScript type definitions

api/                    # Vercel serverless functions
├── products.js         # Product CRUD API
└── orders.js           # Order management API
```

## 🔐 Admin Access

- Default admin email: `fasosrealestate@gmail.com`
- Access admin panel at `/admin`
- Admin features include product management, order tracking, and analytics

## 📊 Features Overview

### Customer Features
- Browse product catalog with filtering and search
- Add products to cart and checkout
- User authentication and account management
- Order history and tracking

### Admin Features
- Product management (add, edit, delete)
- Order management with status updates
- Inventory tracking
- Customer order history
- Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Create a Pull Request

## 📄 License

This project is private and proprietary to The Nunus Journal.

## 📞 Support

For support or questions, please contact the development team.
