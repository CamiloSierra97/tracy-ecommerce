import config from "@/lib/config";

export const dynamic = 'force-dynamic';

export default async function TestConnectionPage() {
  const { url, consumerKey, consumerSecret } = config.woocommerce;
  
  let result = {
    status: "Pending",
    message: "",
    products: [] as any[]
  };

  try {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    // Fetch 5 products to see slugs
    const endpoint = `${url}/wp-json/wc/v3/products?per_page=5`;
    
    console.log("Testing connection to:", endpoint);

    const response = await fetch(endpoint, {
      headers: { Authorization: `Basic ${auth}` },
      cache: 'no-store'
    });

    result.status = response.ok ? "Success" : "Error";
    result.message = `${response.status} ${response.statusText}`;
    
    if (response.ok) {
        const data = await response.json();
        result.products = Array.isArray(data) ? data.map(p => ({
            id: p.id,
            name: p.name,
            slug: p.slug, // CRITICAL: Check this
            status: p.status,
            price: p.price
        })) : [];
    }

  } catch (error: any) {
    result.status = "Exception";
    result.message = error.message;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto font-mono text-sm">
      <h1 className="text-2xl font-bold mb-4 bg-yellow-100 inline-block px-2">WooCommerce Slug Debugger</h1>
      
      <div className={`p-4 rounded border mb-6 ${result.status === "Success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
        <h2 className="font-bold">Connection: {result.status}</h2>
        <p>{result.message}</p>
      </div>

      <h2 className="text-xl font-bold mb-2">Latest 5 Products Slugs</h2>
      <div className="overflow-x-auto bg-gray-50 p-4 rounded border">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b-2 border-gray-200">
                    <th className="p-2">ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2 bg-blue-100">Slug (Use this in URL)</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Price</th>
                </tr>
            </thead>
            <tbody>
                {result.products.map(p => (
                    <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="p-2">{p.id}</td>
                        <td className="p-2">{p.name}</td>
                        <td className="p-2 font-bold text-blue-700">{p.slug}</td>
                        <td className="p-2">{p.status}</td>
                        <td className="p-2">{p.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        {result.products.length === 0 && <p className="p-4 text-center text-gray-500">No products found.</p>}
      </div>
    </div>
  );
}
