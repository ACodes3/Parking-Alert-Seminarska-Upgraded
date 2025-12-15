import { useState, useRef, useEffect } from "react";
import "../styles/additional-styles/customSelect.css";

const CustomSelect = ({ value, onChange, options, label, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label || "Izberite";

  const handleSelect = (newValue) => {
    onChange(newValue);
    setIsOpen(false);
    buttonRef.current?.blur();
  };

  return (
    <div className="custom-select-wrapper" ref={dropdownRef}>
      {label && <label htmlFor={id} className="field__label">{label}</label>}
      <button
        ref={buttonRef}
        id={id}
        className="custom-select-button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{selectedLabel}</span>
        <svg className={`chevron ${isOpen ? "open" : ""}`} viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>
      {isOpen && (
        <div className="custom-select-menu">
          {options.map((option) => (
            <button
              key={option.value}
              className={`custom-select-option ${value === option.value ? "selected" : ""}`}
              onClick={() => handleSelect(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
