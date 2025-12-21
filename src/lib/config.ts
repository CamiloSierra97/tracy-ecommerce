const config = {
  woocommerce: {
    url: process.env.WOOCOMMERCE_API_URL || "",
    consumerKey: process.env.WOO_CONSUMER_KEY || "",
    consumerSecret: process.env.WOO_CONSUMER_SECRET || "",
  },
  whatsapp: {
    phoneNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+573195388469",
  },
};

export default config;
