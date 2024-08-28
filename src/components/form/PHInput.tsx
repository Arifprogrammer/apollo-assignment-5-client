import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  defaultValue?: string | number;
};

const PHInput = ({
  type,
  name,
  label,
  disabled,
  defaultValue,
}: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
            </label>
            <input
              {...field}
              type={type}
              id={name}
              defaultValue={defaultValue}
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default PHInput;
