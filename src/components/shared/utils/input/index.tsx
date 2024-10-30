import React from "react";

export default function Input({
  title,
  value = "",
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
}: {
  title?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col space-y-1">
      {title && (
        <label htmlFor="input" className="text-sm text-white">
          {title}
        </label>
      )}

      <input
        disabled={disabled}
        {...(value && { value })}
        onChange={onChange}
        id="input"
        type="text"
        placeholder={placeholder}
        className={`border-b border-gray-500 bg-[#313131] px-3 py-2 text-base text-white transition duration-200 focus:border-gray-300 focus:bg-[#313131] focus:outline-none ${className}`}
      />
    </div>
  );
}
