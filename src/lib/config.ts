const config = {
  woocommerce: {
    url: process.env.WOOCOMMERCE_API_URL || "",
    consumerKey: process.env.WOO_CONSUMER_KEY || "",
    consumerSecret: process.env.WOO_CONSUMER_SECRET || "",
  },
  whatsapp: {
    phoneNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  },
  wompi: {
    publicKey: process.env.NEXT_PUBLIC_WOMPI_PUB_KEY || "",
    integritySecret: process.env.WOMPI_INTEGRITY_SECRET || "",
    currency: "COP",
  },
  epayco: {
    publicKey: process.env.EPAYCO_PUBLIC_KEY || "",
    privateKey: process.env.EPAYCO_PRIVATE_KEY || "",
    isTest: process.env.EPAYCO_IS_TEST === "true",
  },
} as const;

export default config;
