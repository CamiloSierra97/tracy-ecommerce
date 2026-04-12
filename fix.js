const fs = require('fs');

function fixFile(path, replaces) {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');
  let newContent = content;
  for (const r of replaces) {
    if (r.regex) {
      newContent = newContent.replace(r.search, r.replace);
    } else {
      newContent = newContent.split(r.search).join(r.replace);
    }
  }
  if (content !== newContent) {
    fs.writeFileSync(path, newContent, 'utf8');
    console.log(`Fixed ${path}`);
  }
}

// src/app/acerca-de/page.tsx
fixFile('src/app/acerca-de/page.tsx', [
  { search: '"Tracy te da la confianza que necesitas desde el interior."', replace: '&quot;Tracy te da la confianza que necesitas desde el interior.&quot;' }
]);

// src/app/admin/login/page.tsx
fixFile('src/app/admin/login/page.tsx', [
  { search: 'import { useState } from "react";', replace: 'import { useState } from "react";\nimport Link from "next/link";' },
  { search: '<a\n              href="/"', replace: '<Link\n              href="/"' },
  { search: 'Volver al sitio\n            </a>', replace: 'Volver al sitio\n            </Link>' }
]);

// src/app/admin/register/AdminRegisterClient.tsx
fixFile('src/app/admin/register/AdminRegisterClient.tsx', [
  { search: 'import { useState } from "react";', replace: 'import { useState } from "react";\nimport Link from "next/link";' },
  { search: '<a\n            href="/"', replace: '<Link\n            href="/"' },
  { search: 'Volver al sitio\n          </a>', replace: 'Volver al sitio\n          </Link>' }
]);

// src/app/perfil/page.tsx
fixFile('src/app/perfil/page.tsx', [
  { search: 'import Link from "next/link";', replace: 'import Link from "next/link";' },
  { search: '<a href="/api/auth/signout/"', replace: '<Link href="/api/auth/signout/"' },
  { search: 'Cerrar sesión</a>', replace: 'Cerrar sesión</Link>' }
]);

// src/components/auth/AuthModal.tsx
fixFile('src/components/auth/AuthModal.tsx', [
  { search: 'setMounted(true);', replace: 'const t = setTimeout(() => setMounted(true), 0); return () => clearTimeout(t);' }
]);

// src/components/cart/CartDetails.tsx
fixFile('src/components/cart/CartDetails.tsx', [
  { search: '"Tu carrito está muy silencioso. ¡Añádele un poco de Tracy!"', replace: '&quot;Tu carrito está muy silencioso. ¡Añádele un poco de Tracy!&quot;' }
]);

// src/components/cart/CartDrawer.tsx
fixFile('src/components/cart/CartDrawer.tsx', [
  { search: '<a\n              href="/carrito/"', replace: '<Link\n              href="/carrito/"' },
  { search: 'VER DETALLES\n            </a>', replace: 'VER DETALLES\n            </Link>' }
]);

// src/components/marketing/SalesSidebar.tsx
fixFile('src/components/marketing/SalesSidebar.tsx', [
  { search: 'import Image from "next/image";\n', replace: '' }
]);

// src/components/product/ProductDetails.tsx
fixFile('src/components/product/ProductDetails.tsx', [
  { search: '"Diseñado bajo nuestra premisa de libertad: seducción y bienestar en una sola pieza."', replace: '&quot;Diseñado bajo nuestra premisa de libertad: seducción y bienestar en una sola pieza.&quot;' }
]);

// src/components/profile/OrderCard.tsx
fixFile('src/components/profile/OrderCard.tsx', [
  { search: 'import Icon from "@/components/ui/Icon";\nimport Link from "next/link";\n', replace: '' }
]);

// src/components/ui/PageHero.tsx
fixFile('src/components/ui/PageHero.tsx', [
  { search: 'import { useEffect, useState } from "react";\n', replace: '' },
  { search: 'import { useEffect } from "react";\n', replace: '' }
]);

console.log("All fixes complete");
