"use client";
import React, { InputHTMLAttributes, useRef, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  type?: "text" | "tel" | "email" | "number" | "password" | "url" | "color";
  styleInput?: any;
  iconPosition?: "start" | "end" | string;
  iconClassName?: string | any;
  icon?: JSX.Element;
  inputWrapStyle?: string;
  messageError?:string;
}

export function Input({
  type = "text",
  className = "",
  style = {},
  styleInput,
  label,
  icon = undefined,
  iconClassName,
  iconPosition,
  name,
  required,
  maxLength,
  inputWrapStyle = "",
  messageError,
  ...inputProps
}: InputProps) {
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];


  return (
    <div className={`flex flex-col h-10 justify-center ${inputWrapStyle}`}>
      <div
        className={`flex h-full flex-row items-center justify-center gap-2 border border-gray-600 bg-white p-1 ${
          icon ? "pl-2" : ""
        } rounded `}
        style={style}
      >
        {label && <label htmlFor={name}>{label}</label>}
        {iconPosition === "start" && (
          <span className={`text-lg ${iconClassName}`}>{icon}</span>
        )}
        {/* <input

        // ref={ref}
        type={type}
        {...inputProps}
        className={` ${className} w-full rounded bg-transparent py-1 text-white font-light ${
          icon ?? "px-3"
        }`}
        style={styleInput}
        {...register(name as string, { required })}
        onChange={(e) => setValue(e.target.value)}     
        // onBlur={(e) => {
        //   setValue(e.target.value);
        // }}
        value={value}
      /> */}
        <input
          type={type === "password" && showPass ? "text" : type}
          {...inputProps}
          style={styleInput}
          {...register(name, {
            required: {
              value: !!required,
              message: messageError ? messageError : `${label || name} is required`,
            },
          })}
          className={`h-full rounded-lg w-full bg-white py-1 text-primary font-medium outline-none focus:outline-none focus:bg-white ${icon && "px-3"
            } ${className}`}
            maxLength={maxLength}
        />
        {iconPosition === "end" && (
          <span className={`text-lg ${iconClassName}`}>{icon}</span>
        )}
        {type === "password" && (
          <span
            onClick={() => {
              setShowPass(!showPass);
            }}
            className="text-black cursor-pointer"
          >
            {type === "password" && showPass ? (
              <AiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </span>
        )}
      </div>
      {error && (
        <p className="flex flex-row items-center justify-start gap-1 mt-1 text-sm text-red-500">
          <i className="">
            <BiError />
          </i>{" "}
          <span>{error?.message as string}</span>
        </p>
      )}
    </div>
  );
}
