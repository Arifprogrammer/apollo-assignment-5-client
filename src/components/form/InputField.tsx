export const InputField = ({
  label,
  id,
  type,
  required,
  defaultValue,
  name,
}: {
  label: string;
  id: string;
  type: string;
  name?: string;
  required?: boolean;
  defaultValue?: string | number;
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} {required && "*"}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      defaultValue={defaultValue}
      className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);
