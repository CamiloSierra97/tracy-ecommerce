const config = {
  woocommerce: {
    url: process.env.WOOCOMMERCE_API_URL || "",
    consumerKey: process.env.WOO_CONSUMER_KEY || "",
    consumerSecret: process.env.WOO_CONSUMER_SECRET || "",
  },
};

export default config;
