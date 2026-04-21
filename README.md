# Tracy E-commerce Frontend

A modern, performance-focused e-commerce frontend built with Next.js App Router. This project represents the digital storefront for Tracy, focusing on speed, accessibility, and modern React architectural patterns.

## Architectural Principles

This application is modern, production-oriented engineering principles:

1. **Server Components by Default**: We maximize the use of React Server Components (RSC) to reduce client-side JavaScript, pushing data fetching and rendering to the server.
2. **Explicit Domain Modeling**: The codebase is partitioned into distinct business domains (`products`, `cart`, `checkout`, `shared`), making boundaries explicit and the architecture scalable.
3. **Strict Client Boundaries**: `"use client"` is only used at the leaves of the component tree where interactivity (hooks, state, event listeners) is strictly required.
4. **Native Data Fetching**: We leverage native `fetch()` alongside Next.js caching and ISR (Incremental Static Regeneration) features to handle product updates predictably without relying on heavy client-side libraries.
5. **High Performance**: Selective animations are implemented where they demonstrably improve UX. Layouts avoid unnecessary re-renders, and heavy assets are lazily loaded or optimized natively.
6. **Strict TypeScript**: Types are used to express clear business intent and prevent runtime errors.

## Tech Stack

- **Framework**: [Next.js 14/15](https://nextjs.org/) (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Custom CSS (for precise, tailored design system components)
- **Animations**: Framer Motion
- **Backend/Headless**: WooCommerce REST API
- **Deployment**: Vercel (recommended)

## Folder Structure

The project follows a Domain-Driven Design (DDD) approach within the Next.js `app` and `components` directories:

```
src/
├── app/
│   ├── (products)/      # Product listing, categories, and details
│   ├── (cart)/          # Shopping cart flows
│   ├── (checkout)/      # Checkout and order success pages
│   └── (shared)/        # Shared pages (Home, Admin, Auth)
├── components/
│   ├── products/        # Product cards, grids, reviews
│   ├── cart/            # Cart drawer, cart items
│   ├── checkout/        # Checkout forms, order summary
│   └── shared/          # UI elements, Layouts, Marketing blocks
├── services/            # Server-side integration (WooCommerceService)
├── utils/               # Pure functions and helpers
├── context/             # Global React Contexts (e.g., CartContext)
└── lib/                 # Third-party configurations
```

## Getting Started

### Prerequisites

- Node.js 18+
- A running WooCommerce store with REST API enabled.

### Environment Variables

Copy `.env.example` to `.env.local` and populate the following keys:

```env
NEXT_PUBLIC_WC_URL=https://your-store.com
WC_CONSUMER_KEY=ck_...
WC_CONSUMER_SECRET=cs_...
```

### Running Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Data Fetching Strategy

- **Product Listing**: Incremental Static Regeneration (ISR) to cache the catalog while ensuring freshness.
- **Product Details**: ISR, revalidating periodically.
- **Cart & Checkout**: `no-store` fetching to guarantee accurate pricing, stock availability, and secure transactions in real-time.

## Project Status

This repository is currently **Active** and serves as the primary storefront implementation. Ongoing work involves refining checkout security and optimizing edge caching.
