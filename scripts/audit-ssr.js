// Native fetch is available in Node 18+

async function auditSSR() {
  const url = "http://localhost:3000";
  console.log(`Auditing SSR for ${url}...`);

  try {
    const response = await fetch(url);
    const html = await response.text();

    console.log("--- SSR Content Check ---");

    // 1. Check for Hero Section content (should be present if SSR'd)
    const heroTitle = html.includes("Tracy"); // Assuming "Tracy" is in h1
    console.log(`Hero Title Present: ${heroTitle ? "✅" : "❌"}`);

    // 2. Check for Navigation (should be present)
    const navPresent = html.includes("<nav") || html.includes("nav__menu");
    console.log(`Navigation Present: ${navPresent ? "✅" : "❌"}`);

    // 3. Check for Footer (should be present)
    const footerPresent = html.includes("<footer");
    console.log(`Footer Present: ${footerPresent ? "✅" : "❌"}`);

    // 4. Check for Client-Side Only Indicators (e.g., empty roots usually indicate CSR)
    // Next.js usually renders content, so if we see meaningful content, SSR is working.

    const carouselPresent = html.includes("hero-carousel");
    console.log(`Carousel Structure Present: ${carouselPresent ? "✅" : "❌"}`);

    console.log("\n--- Metadata Check ---");
    const titleRegex = /<title>(.*?)<\/title>/;
    const match = html.match(titleRegex);
    console.log(`Title Tag: ${match ? match[1] : "❌ Not Found"}`);

    const metaDesc = html.includes('name="description"');
    console.log(`Meta Description: ${metaDesc ? "✅" : "❌"}`);
  } catch (error) {
    console.error("Error fetching page:", error);
  }
}

auditSSR();
