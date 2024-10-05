import React from "react";

export default function Slider({name, colour, range, value, handleChange, isSelectable, handleSelect}) {

  return <div className="flex items-center w-full justify-between my-1">
    <div className={isSelectable ? "w-4 h-4 rounded-full diw" : "w-4 h-4 rounded-full"}
         onClick={()=>handleSelect(name)}
    ></div>
    <label htmlFor={name} className="text">
      {name}
    </label>
    <input id={name} type={"range"} min={range[0]} max={range[1]} step={0.01}
           value={value} onChange={(e) => handleChange(name, e.target.value)}
           className="appearance-none rounded-full h-1.5"
           style={{
             background: colour
           }}
    />
    <style jsx>{`
      input[type='range']::-webkit-slider-thumb {
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #13191c;
        border: 3px solid ${colour}; 
        cursor: pointer;
      }
      label {
        color: ${colour};
      }
      .diw {
        background: ${colour};
      }
    `}</style>

  </div>
}