import config from "@/lib/config";

export const dynamic = 'force-dynamic';

export default async function TestConnectionPage() {
  const { url, consumerKey, consumerSecret } = config.woocommerce;
  
  const debugInfo = {
    urlLength: url ? url.length : 0,
    hasKey: !!consumerKey,
    hasSecret: !!consumerSecret,
    nodeEnv: process.env.NODE_ENV,
    urlValue: url // Safely showing the URL as it's not a secret
  };

  let connectionResult = {
    status: "Pending",
    message: "",
    data: null as any
  };

  try {
    if (!url || !consumerKey || !consumerSecret) {
      throw new Error("Missing Credentials in Config");
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const endpoint = `${url}/wp-json/wc/v3/products?per_page=1`;
    
    console.log("Testing connection to:", endpoint);

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Basic ${auth}`
      },
      cache: 'no-store'
    });

    connectionResult.status = response.ok ? "Success" : "Error";
    connectionResult.message = `${response.status} ${response.statusText}`;
    
    if (response.ok) {
        const data = await response.json();
        connectionResult.data = Array.isArray(data) ? `Found ${data.length} products` : "Invalid data format";
    } else {
        const text = await response.text();
        connectionResult.data = text.slice(0, 500); // Show first 500 chars of error
    }

  } catch (error: any) {
    connectionResult.status = "Exception";
    connectionResult.message = error.message;
    connectionResult.data = JSON.stringify(error, Object.getOwnPropertyNames(error));
  }

  return (
    <div className="p-8 max-w-2xl mx-auto font-mono text-sm">
      <h1 className="text-2xl font-bold mb-4">WooCommerce Connection Test</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="font-bold mb-2">Configuration Check</h2>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>

      <div className={`p-4 rounded border ${connectionResult.status === "Success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
        <h2 className="font-bold mb-2">Connection Result: {connectionResult.status}</h2>
        <p className="font-bold">{connectionResult.message}</p>
        <pre className="mt-2 whitespace-pre-wrap break-all text-xs">
            {typeof connectionResult.data === 'string' ? connectionResult.data : JSON.stringify(connectionResult.data, null, 2)}
        </pre>
      </div>
      
      <div className="mt-8 text-xs text-gray-500">
        <p>This is a temporary debugging page. Delete after use.</p>
      </div>
    </div>
  );
}
