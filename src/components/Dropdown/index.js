export default function Dropdown({
  name,
  label,
  value,
  options,
  onValueChange,
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-stone-600">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onValueChange}
        className="h-9 mt-1 block w-full rounded-md border border-gray-100 bg-gray-100  shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      >
        <option value="">All {name}</option>
        {options &&
          options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
}
