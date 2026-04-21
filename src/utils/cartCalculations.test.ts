import { describe, it, expect } from "vitest";
import {
  calculateCartTotal,
  calculateCartCount,
  calculateDiscount,
} from "./cartCalculations";
import { Coupon } from "@/services/WooCommerceService";
import { CartItem } from "@/context/CartContext";

describe("Cart Calculations", () => {
  const mockItems: CartItem[] = [
    { id: 1, price: "10000", quantity: 2, name: "Product 1", slug: "product-1" } as any,
    { id: 2, price: "5000", quantity: 1, name: "Product 2", slug: "product-2" } as any,
  ];

  describe("calculateCartTotal", () => {
    it("should calculate the correct total for multiple items", () => {
      const total = calculateCartTotal(mockItems);
      // (10000 * 2) + (5000 * 1) = 25000
      expect(total).toBe(25000);
    });

    it("should return 0 for an empty cart", () => {
      expect(calculateCartTotal([])).toBe(0);
    });
  });

  describe("calculateCartCount", () => {
    it("should calculate the total quantity of items", () => {
      const count = calculateCartCount(mockItems);
      // 2 + 1 = 3
      expect(count).toBe(3);
    });

    it("should return 0 for an empty cart", () => {
      expect(calculateCartCount([])).toBe(0);
    });
  });

  describe("calculateDiscount", () => {
    const cartTotal = 25000;

    it("should return 0 if no coupon is provided", () => {
      expect(calculateDiscount(cartTotal, null)).toBe(0);
    });

    it("should return 0 if minimum amount is not met", () => {
      const coupon = {
        amount: "5000",
        discount_type: "fixed_cart",
        minimum_amount: "30000",
      } as Coupon;
      expect(calculateDiscount(cartTotal, coupon)).toBe(0);
    });

    it("should calculate percentage discount correctly", () => {
      const coupon = {
        amount: "10",
        discount_type: "percent",
      } as Coupon;
      // 10% of 25000 = 2500
      expect(calculateDiscount(cartTotal, coupon)).toBe(2500);
    });

    it("should calculate fixed cart discount correctly", () => {
      const coupon = {
        amount: "5000",
        discount_type: "fixed_cart",
      } as Coupon;
      expect(calculateDiscount(cartTotal, coupon)).toBe(5000);
    });

    it("should not discount more than the cart total for fixed discount", () => {
      const coupon = {
        amount: "30000",
        discount_type: "fixed_cart",
      } as Coupon;
      expect(calculateDiscount(cartTotal, coupon)).toBe(25000);
    });
  });
});
