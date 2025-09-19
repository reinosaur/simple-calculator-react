import React from "react";

const OpButton = ({ label, onClick, className }) => {
    return (
        <button
        className={`bg-orange-500 text-white p-4 rounded hover:bg-orange-400 ${className}`}
        onClick={() => onClick(label)}
        >
            {label}
        </button>
    )
}

export default OpButton;