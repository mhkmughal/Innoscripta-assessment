export default function InputField({
  max,
  name,
  type,
  label,
  value,
  placeholder,
  onInputChange,
}) {
  const onInputChangeLocal = (e) => {
    if (type == "number" && max) {
      if (e.target.value < max + 1) {
        onInputChange(e);
      }
    } else {
      onInputChange(e);
    }
  };

  return (
    <div>
      <label
        htmlFor={label}
        className="text-sm font-medium text-stone-600"
      >
        {label}
      </label>
      <div>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onInputChangeLocal}
          className="h-[45px] mt-1 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 p-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  );
}
