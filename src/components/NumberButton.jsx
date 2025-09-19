import React from "react";

const NumberButton = ({ label, onClick, className }) => {
  return (
    <button
        className={`bg-gray-800 text-white p-4 rounded hover:bg-gray-700 ${className}`}
        onClick={() => onClick(label)}
      >
        {label}
    </button>
  );
}

export default NumberButton;