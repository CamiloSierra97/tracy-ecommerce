# Phase 1: Static Audit Summary

## 1. Architecture & Structure Smells
- **Domain fragmentation**: Features are split between `src/app/` (routes) and `src/components/` (UI), rather than co-located by domain.
- **Language mixing (Spanglish)**: Routes use Spanish (`carrito`, `productos`, `tienda`), while component directories use English (`cart`, `product`, `checkout`).
- **Feature grouping**: We need to migrate to a feature-based / domain-driven architecture (`products`, `cart`, `checkout`, `shared`).

## 2. Layout Misuse
- `src/app/layout.tsx` is heavily loaded with client-side providers (`ReactQueryProvider`, `UIProvider`, `CartProvider`, `TransitionProvider`). 
- While Next.js App Router allows passing `children` to Client Components, wrapping the entire app in heavy context providers can degrade initial load performance and increase the client bundle size.
- `DynamicLayoutElements` is rendered globally, which could affect Time to First Byte (TTFB) and streaming capabilities.

## 3. Data-Fetching Anti-Patterns
- **React Query for Page-Level Data**: `src/app/page.tsx` and `src/components/product/Products.tsx` use `@tanstack/react-query` with `HydrationBoundary` and `dehydrate` to fetch product lists. While valid, this is an anti-pattern for Next.js 13/14+. Standard page-level data should be fetched directly in async Server Components.
- React Query should be reserved for client-side mutations (adding to cart, updating quantities) or infinite scrolling, not the initial SSR pass.

## 4. Incorrect Client Components
- Components like `Products.tsx` are marked with `"use client"` solely to use `useProducts` (React Query) and framer-motion. They could be refactored to accept data as props from a Server Component, drastically reducing client-side JavaScript.
- `ProductCard.tsx` uses `"use client"` for Quick View and Add to Cart interactions. This could be optimized by extracting the interactive buttons into smaller client components, keeping the main card as a Server Component.

## 5. SEO Gaps
- Although product detail pages (`[slug]/page.tsx`) have excellent SEO implementation (JSON-LD, dynamic metadata, canonical tags), the main product listing relies on client-side hydration for rendering the grid. If hydration fails or is delayed, crawlers might not see the full DOM immediately.
- Fallback pagination exists but the main rendering loop relies on `allProducts` derived from client-side state.

## 6. Image Optimization
- `ProductCard.tsx` uses `next/image` with `sizes` correctly, but relies on fixed width/height (500x667). 
- The `priority` prop is passed down but needs careful management to ensure only Above-The-Fold (ATF) images get it, avoiding LCP regressions.

## Action Plan (Phase 2)
1. Reorganize `src/app` and `src/components` into domain folders: `products`, `cart`, `checkout`, `shared`.
2. Refactor routing structure to align with domains.
3. Decouple Server Components from React Query where possible.
