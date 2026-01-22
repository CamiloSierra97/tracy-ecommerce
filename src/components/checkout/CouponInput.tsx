"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Icon from "@/components/ui/Icon";

export default function CouponInput() {
  const { applyCoupon, coupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setError(null);

    const success = await applyCoupon(code);

    if (!success) {
      setError("Código no válido o expirado");
    } else {
      setCode("");
    }

    setIsLoading(false);
  };

  if (coupon) {
    return (
      <div className="coupon-input__success bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="icon-check" size={16} className="text-green-600" />
          <div>
            <span className="coupon-input__success-code font-bold text-green-700 block text-sm">
              {coupon.code}
            </span>
            <span className="coupon-input__success-discount text-xs text-green-600 block">
              Descuento aplicado:{" "}
              {coupon.discount_type === "percent"
                ? `${coupon.amount}%`
                : `$${coupon.amount}`}
            </span>
          </div>
        </div>
        <button
          onClick={removeCoupon}
          className="coupon-input__remove-btn text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Eliminar cupón"
        >
          <Icon name="icon-close" size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="coupon-input">
      <form onSubmit={handleApply} className="coupon-input__form flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Código de cupón"
          className="coupon-input__input flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors uppercase placeholder:normal-case"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !code.trim()}
          className="coupon-input__submit-btn bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isLoading ? "..." : "Aplicar"}
        </button>
      </form>
      {error && (
        <p className="coupon-input__error text-xs text-red-500 mt-1 ml-1">
          {error}
        </p>
      )}
    </div>
  );
}
