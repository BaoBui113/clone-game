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
  underline = true,
}: {
  type?: 'text' | 'password' | 'number';
  title?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  classNameInput?: string;
  endContext?: React.ReactNode;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  underline?: boolean;
}) {

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {title && (
        <label htmlFor="input" className="text-sm text-white mb-[10px]">
          {title}
        </label>
      )}
      <div className="relative">
        <input
          disabled={disabled}
          onChange={onChange}
          id="input"
          type={type}
          placeholder={placeholder}
          className={`px-3 py-2 text-base w-full ${underline ? 'border-b  border-gray-500 bg-[#313131] text-white transition duration-200 focus:border-gray-300 focus:bg-[#313131] focus:outline-none' : 'bg-white text-black border-none focus:bg-white focus:text-black focus:outline-none' } ${classNameInput} `}
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
