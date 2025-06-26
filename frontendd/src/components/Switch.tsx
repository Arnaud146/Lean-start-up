import React from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onChange, ...props }, ref) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer select-none" style={{ minWidth: 44, minHeight: 28 }}>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        <div
          className="w-11 h-7 bg-gray-200 peer-checked:bg-orange-200 rounded-full transition-colors duration-200 flex items-center"
        >
          <div
            className="w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-200 peer-checked:translate-x-4"
          />
        </div>
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch }; 