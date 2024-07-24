import React from "react";

export default function DateField({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col">
      <label for={label} className="text-sm font-medium text-stone-600">
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-9 mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
    </div>
  );
}
