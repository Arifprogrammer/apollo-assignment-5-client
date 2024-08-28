import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const PHInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <label
              htmlFor={name}
              className="block text-md font-medium text-gray-800 mt-2"
            >
              {label}
            </label>
            <input
              {...field}
              type={type}
              id={name}
              disabled={disabled}
              className="mt-2 bg-transparent border-2 border-[#154f6e] rounded-md w-full p-2 focus:outline-none focus:border-[#F77F00]"
            />
            {error && <small className="text-red-600">{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default PHInput;
