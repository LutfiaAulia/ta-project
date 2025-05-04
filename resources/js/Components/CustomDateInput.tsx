import React from "react";

const CustomDateInput = React.forwardRef<HTMLInputElement, any>(
    ({ value, onClick, onChange, placeholder }, ref) => (
        <input
            type="text"
            onClick={onClick}
            onChange={onChange}
            ref={ref}
            value={value}
            placeholder={placeholder}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
        />
    )
);

CustomDateInput.displayName = "CustomDateInput";
export default CustomDateInput;
