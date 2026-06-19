import type { HTMLInputTypeAttribute } from "react";

type TextFieldProps = {
  id: string;
  label: string;
  value?: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  onChange?: (value: string) => void;
};

export function TextField({
  id,
  label,
  value,
  name = id,
  type = "text",
  placeholder,
  required = false,
  maxLength,
  onChange,
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-emerald-950 dark:text-emerald-50">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className="mt-2 w-full rounded-md border border-emerald-950/15 bg-white px-4 py-3 text-emerald-950 outline-none transition focus:border-teal-700 dark:border-white/15 dark:bg-[#071412] dark:text-emerald-50 dark:placeholder:text-emerald-50/40"
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
      />
    </div>
  );
}
