import React from 'react';

export function SelectOption({ dataSelect, handleChange, handleColor, ...props }) {
    const { className, label, name, options } = dataSelect;
    const value = props[name];

    return (
        <div className={className}>
            <label>{label}</label>
            <div className="select-style">
                <select
                    name={name}
                    value={value}
                    onChange={handleChange}
                    style={{ color: handleColor(value) }}>
                    {
                        options.map(({ value, id, text }, i) => 
                        <option value={value} key={id} disabled={i === 0}>{text}</option>)
                    }
                </select>
            </div>
        </div>
    );
}
