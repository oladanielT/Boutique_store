# Tunasky Wears - Full Stack Ecommerce Platform

A modern, full-stack ecommerce platform built with Next.js 16, Supabase, Stripe, and Framer Motion animations.

## Features

### Customer Storefront
- Modern hero section with smooth animations
- Product catalog with image support
- Shopping cart with real-time updates
- Secure Stripe checkout
- Order confirmation page
- Responsive design (mobile-first)

### Admin Dashboard
- Secure email/password authentication
- Dashboard with analytics overview
- Product management (CRUD operations)
- Order management with status tracking
- Real-time order statistics
- Professional UI with animations

### Design & UX
- Modern luxury aesthetic with gold accents
- Dark mode support
- Smooth Framer Motion animations
- Responsive across all devices
- Loading states and error handling
- Toast notifications

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: JWT-based admin auth with bcryptjs
- **Payments**: Stripe Checkout
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Auth
AUTH_SECRET=your_secret_key_generate_with_openssl_rand_base64_32
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Generate AUTH_SECRET

```bash
openssl rand -base64 32
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Database Setup

The database schema has already been created with these tables:
- `admin_users` - Admin credentials (hashed passwords)
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Items in each order

All tables have Row Level Security (RLS) policies enabled.

### 5. Initialize Admin User

The first admin user is created automatically on first login:
- Email: `admin@tunasky.com`
- Password: `Admin123!`

These credentials will create the admin user in the database on first login.

### 6. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000`

## Project Structure

```
app/
├── layout.tsx                 # Root layout
├── page.tsx                   # Homepage
├── globals.css               # Global styles & design tokens
├── api/
│   ├── admin/
│   │   └── login/            # Admin authentication
│   └── create-order/         # Stripe order creation
├── products/
│   ├── page.tsx             # Products catalog
│   └── [id]/
│       └── page.tsx         # Product details
├── cart/
│   └── page.tsx             # Shopping cart
├── checkout/
│   └── page.tsx             # Checkout page
├── success/
│   └── page.tsx             # Order success
├── admin/
│   ├── login/               # Admin login
│   ├── page.tsx             # Admin dashboard
│   ├── products/
│   │   └── page.tsx         # Product management
│   └── orders/
│       └── page.tsx         # Order management
components/
└── navbar.tsx               # Navigation component
lib/
├── supabase.ts             # Supabase client & types
└── auth.ts                 # Authentication utilities
```

## Key Features Explained

### Storefront Flow
1. User visits homepage
2. Browses products catalog
3. Adds items to cart (stored in localStorage)
4. Proceeds to checkout
5. Enters shipping information
6. Pays via Stripe
7. Receives order confirmation

### Admin Flow
1. Admin logs in with email/password
2. Lands on dashboard with stats
3. Can manage products (add/edit/delete)
4. Can manage orders (view details, update status)
5. Sees real-time analytics

### Authentication
- **Customers**: No login required (guest checkout)
- **Admin**: JWT-based authentication with HTTP-only cookies
- **Password Security**: bcryptjs hashing with 10 salt rounds

### Cart System
- Client-side cart stored in localStorage
- Each item tracked individually with quantity
- Cart persists across page refreshes
- Cleared after successful order

## Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in project settings
3. Deploy

```bash
vercel deploy
```

### Database Migrations

After deploying, ensure your Supabase database is properly configured:
1. All tables are created
2. RLS policies are enabled
3. Indexes are created for performance

## API Endpoints

### POST /api/admin/login
Create admin session with JWT token

**Request:**
```json
{
  "email": "admin@tunasky.com",
  "password": "Admin123!"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "email": "admin@tunasky.com"
}
```

### POST /api/create-order
Create order and Stripe checkout session

**Request:**
```json
{
  "email": "customer@example.com",
  "name": "John Doe",
  "address": "123 Main Street, NY 10001, USA",
  "items": [
    {
      "id": "product_id",
      "name": "Product Name",
      "price": 29.99,
      "quantity": 1,
      "image_url": "https://..."
    }
  ],
  "total": 29.99
}
```

**Response:**
```json
{
  "sessionUrl": "https://checkout.stripe.com/...",
  "orderId": "order_uuid"
}
```

## Payment Flow

1. Customer creates order on checkout page
2. Order created in Supabase with status "pending"
3. Stripe checkout session created
4. Customer redirected to Stripe
5. On success, customer redirected to `/success?order_id=...`
6. Order status remains "pending" until admin marks as "completed"

## Troubleshooting

### Admin Login Not Working
- Ensure `AUTH_SECRET` is set in environment variables
- Check that Supabase is properly configured
- Verify admin user exists in database

### Products Not Showing
- Check Supabase connection
- Ensure RLS policies allow public SELECT on products table
- Add test products via admin panel

### Stripe Checkout Failing
- Verify Stripe keys are correct
- Ensure `NEXT_PUBLIC_APP_URL` is set correctly
- Check Stripe dashboard for webhook logs

### Cart Not Persisting
- Check browser localStorage is enabled
- Verify no JavaScript errors in console
- Clear browser cache and try again

## Future Enhancements

- User accounts with order history
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Inventory management
- Product search and filtering
- Multiple payment methods
- Webhook handling for Stripe events
- Admin analytics dashboard
- Customer management

## License

MIT
