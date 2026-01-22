import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const config = {
  url: process.env.WOOCOMMERCE_API_URL,
  key: process.env.WOO_CONSUMER_KEY,
  secret: process.env.WOO_CONSUMER_SECRET,
};

async function testConnection() {
  console.log("--- Testing WooCommerce Connection ---");
  console.log("URL:", config.url);
  console.log("Key exists:", !!config.key);
  console.log("Secret exists:", !!config.secret);

  if (!config.url) {
    console.error("ERROR: Missing WOOCOMMERCE_API_URL");
    return;
  }

  // 1. Test Basic Connection (Products Endpoint) - Public/Consumer Key auth
  try {
    const auth = Buffer.from(`${config.key}:${config.secret}`).toString(
      "base64",
    );
    console.log("\n--- Attempting Product Fetch (Basic Auth) ---");
    const response = await fetch(
      `${config.url}/wp-json/wc/v3/products?per_page=1`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      },
    );

    console.log("Product Fetch Status:", response.status);
    if (!response.ok) {
      console.log("Response Text:", await response.text());
    } else {
      console.log("Product Fetch Success! Connection is working.");
    }
  } catch (error) {
    console.error("FATAL ERROR connecting to WooCommerce:", error);
  }

  // 2. Test JWT Auth Endpoint check
  try {
    console.log("\n--- Checking JWT Endpoint Existence ---");
    const jwtUrl = `${config.url}/wp-json/jwt-auth/v1/token`;
    console.log("Target:", jwtUrl);

    // Just making a bad request to see if 400 or 404 (404 means plugin missing)
    const response = await fetch(jwtUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}), // Empty body should trigger 403 or 400
    });

    console.log("JWT Endpoint Status:", response.status);
    const text = await response.text();
    console.log("Response Body Preview:", text.substring(0, 200));

    if (response.status === 404) {
      console.error(
        "CRITICAL: JWT Auth Plugin endpoint not found (404). Is the plugin installed?",
      );
    } else if (response.status === 200) {
      console.error("WARNING: Got 200 for empty body? Unexpected.");
    } else {
      console.log(
        "Endpoint seems reachable (Status not 404). Proceeding to Credential Test is possible.",
      );
    }
  } catch (error) {
    console.error("Error checking JWT endpoint:", error);
  }
}

testConnection();
