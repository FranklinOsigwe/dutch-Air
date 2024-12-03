import { ChangeEventHandler, useId } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface IProps<T extends FieldValues> {
  label: string;
  defaultValue: string;
  type?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  register: UseFormRegister<T>;
  errorMessage?: string;
  valueAsNumber?: boolean;
}

const Input = <T extends FieldValues>(props: IProps<T>) => {
  const {
    label,
    type = "text",
    onChange,
    name,
    register,
    errorMessage,
    defaultValue,
    valueAsNumber,
  } = props;

  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        id={id}
        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[40px] px-3 py-2"
        defaultValue={defaultValue}
        {...register(name as any, { ...(valueAsNumber && { valueAsNumber }) })}
        onChange={onChange}
        required
      />

      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </div>
  );
};

export default Input;
