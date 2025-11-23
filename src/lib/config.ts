const config = {
  woocommerce: {
    url: process.env.NEXT_PUBLIC_WOO_BASE_URL || "",
    consumerKey: process.env.WOO_CONSUMER_KEY || "",
    consumerSecret: process.env.WOO_CONSUMER_SECRET || "",
  },
};

export default config;
