import React from "react";

interface InputGroupProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function InputGroup({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}: InputGroupProps) {
  const inputId = `input-${name}`;

  return (
    <div className="checkout-form__input-group">
      <label
        htmlFor={inputId}
        className="checkout-form__label block text-sm font-medium text-black mb-1"
      >
        {label} {required && <span className="text-burgundy">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="checkout-form__input w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-black"
      />
    </div>
  );
}
