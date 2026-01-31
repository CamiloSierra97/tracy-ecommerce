const config = {
  woocommerce: {
    url: process.env.WOOCOMMERCE_API_URL || "",
    consumerKey: process.env.WOO_CONSUMER_KEY || "",
    consumerSecret: process.env.WOO_CONSUMER_SECRET || "",
  },
  whatsapp: {
    phoneNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+573195388469",
  },
  wompi: {
    publicKey:
      process.env.NEXT_PUBLIC_WOMPI_PUB_KEY ||
      "pub_test_Q5yDA9xoKdePzhSGeVe9HAez7CTSwaX1", // Sandbox Default or Placeholder
    integritySecret:
      process.env.WOMPI_INTEGRITY_SECRET ||
      "prv_test_H61B72dc54E1430094C69188F356D332", // Sandbox Default or Placeholder
    currency: "COP",
  },
  epayco: {
    publicKey: process.env.EPAYCO_PUBLIC_KEY || "",
    privateKey: process.env.EPAYCO_PRIVATE_KEY || "",
    isTest: process.env.EPAYCO_IS_TEST === "true",
  },
  admin: {
    email: process.env.ADMIN_EMAIL || "admin@tracystore.com",
    password: process.env.ADMIN_PASSWORD || "admin123", // Cambiar en producción
  },
};

export default config;
