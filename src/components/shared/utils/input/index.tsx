"use client";
import React from "react";

export default function Input({
  title,
  value = "",
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
  classNameInput = "",
  endContext,
  type = "text",
  errorMessage,
}: {
  type?: string;
  title?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  classNameInput?: string;
  endContext?: React.ReactNode;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  console.log("type", type);

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {title && (
        <label htmlFor="input" className="text-sm text-white">
          {title}
        </label>
      )}
      <div className="relative">
        <input
          disabled={disabled}

          onChange={onChange}
          id="input"
          {...(type === "password" && { type: "password" })}

          type={type}
          // type={type === "password" ? "password" : "text"}
          placeholder={placeholder}
          className={`border-b w-full border-gray-500 bg-[#313131] px-3 py-2 text-base text-white transition duration-200 focus:border-gray-300 focus:bg-[#313131] focus:outline-none ${classNameInput}`}
        />
        {endContext && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {endContext}
          </div>
        )}
        {errorMessage && (
          <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
        )}
      </div>

    </div>
  );
}
