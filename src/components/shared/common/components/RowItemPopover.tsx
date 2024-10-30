"use client";
import React from "react";

interface RowPopoverItemProps extends ReactProps {
  icon: JSX.Element;
  title: string;
  onClick?: () => void; // Define the type for onClick as a function that takes no arguments and returns void
}

export function RowPopoverItem({ icon, title, ...props }: RowPopoverItemProps) {
  return (
    <li
      className="flex flex-row items-center justify-start w-full gap-2 py-2 mb-1 text-sm text-white border-b border-gray-500 cursor-pointer hover:text-warning"
      onClick={props.onClick}
    >
      <i>{icon}</i> <span>{title}</span>
    </li>
  );
}
