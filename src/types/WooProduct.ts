export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string;
  date_on_sale_from_gmt: string;
  date_on_sale_to: string;
  date_on_sale_to_gmt: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: number[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: string;
  sold_individually: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  brands: [];
  tags: [];
  images?: { id: number; src: string; name: string }[];
  attributes: [];
  default_attributes: [];
  variations: [];
  grouped_products: [];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: Array<
    [
      {
        id: number;
        key: string;
        value: string;
      }
    ]
  >;
  stock_status: string;
  has_options: boolean;
  post_password: string;
  global_unique_id: string;
  _links: {
    self: Array<{
      href: string;
      targetHints: {
        allow: Array<string>;
      };
    }>;
    collection: Array<{
      href: string;
    }>;
  };
}
