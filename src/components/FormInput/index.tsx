interface IFormInputProps {
    type: string;
    name: string;
    label: string;
    value: string | number;
    onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    modal?: boolean;
}
export const FormInput = ({
    type,
    name,
    label,
    value,
    onFieldChange,
    required = true,
    modal = true,
    ...rest
}: IFormInputProps) => {
    return (
        <div className="relative w-full max-w-sm">
            <input
                type={type}
                name={name}
                className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm   text-gray-900 focus:border-blue-800 focus:outline-none focus:ring-0"
                placeholder=" "
                value={value}
                onChange={onFieldChange}
                required={required}
                {...rest}
            />
            <label
                htmlFor={name}
                className={`absolute top-2 left-1 z-10  origin-[0] -translate-y-4 scale-75 transform  px-2 text-sm  duration-300  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2  ${
                    modal
                        ? "bg-white text-gray-600 peer-focus:text-blue-600"
                        : "bg-blue-600 text-gray-200 peer-focus:text-white  xl:bg-white xl:text-gray-600 xl:peer-focus:text-blue-600"
                }`}
            >
                {label}
            </label>
        </div>
    );
};
