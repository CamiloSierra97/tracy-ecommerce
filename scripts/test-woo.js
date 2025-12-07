const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim().replace(/^["']|["']$/g, ''); // Remove quotes
            process.env[key.trim()] = value;
        }
    });
} else {
    console.error("❌ .env.local not found at", envPath);
    process.exit(1);
}

const url = process.env.WOOCOMMERCE_API_URL;
const key = process.env.WOO_CONSUMER_KEY;
const secret = process.env.WOO_CONSUMER_SECRET;

console.log("----------------------------------------");
console.log("🔍 Testing WooCommerce Connection");
console.log("URL:", url);
console.log("Key:", key ? key.substring(0, 5) + "..." : "MISSING");
console.log("Secret:", secret ? secret.substring(0, 5) + "..." : "MISSING");
console.log("----------------------------------------");

if (!url || !key || !secret) {
    console.error("❌ Missing variables!");
    process.exit(1);
}

// Basic Auth encoding
const request = (isQueryParams = false) => {
    const apiPath = '/wp-json/wc/v3/products?per_page=1';
    let fullUrl;
    let headers = {
        'User-Agent': 'Node.js Test Script'
    };

    const auth = Buffer.from(`${key}:${secret}`).toString('base64');
    
    if (isQueryParams) {
        fullUrl = new URL(apiPath, url);
        fullUrl.searchParams.append('consumer_key', key);
        fullUrl.searchParams.append('consumer_secret', secret);
        console.log(`\n🔄 Attempt 2: Query Parameters (Fallback)...`);
    } else {
        fullUrl = new URL(apiPath, url);
        headers['Authorization'] = `Basic ${auth}`;
        console.log(`\n🔄 Attempt 1: Basic Auth Headers (Standard)...`);
    }

    console.log(`🌐 Fetching: ${fullUrl.toString()}`);

    const options = {
        hostname: fullUrl.hostname,
        port: fullUrl.port || 443,
        path: fullUrl.pathname + fullUrl.search,
        method: 'GET',
        headers: headers
    };

    const req = https.request(options, (res) => {
        console.log(`📡 Response Status: ${res.statusCode} ${res.statusMessage}`);
        
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                console.log("✅ SUCCESS! Connection working with " + (isQueryParams ? "Query Params" : "Headers"));
            } else {
                console.log("❌ FAIL.");
                if (!isQueryParams) request(true); // Try next method
            }
        });
    });

    req.on('error', (e) => {
        console.error(`❌ Network Error: ${e.message}`);
    });

    req.end();
};

request(false);
