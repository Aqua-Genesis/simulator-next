import React, { useState } from 'react';

const SliderComponent = () => {
  const slidersData = [
    { label: 'Slider 1', color: '#FF5733' }, // orange
    { label: 'Slider 2', color: '#33FF57' }, // green
    { label: 'Slider 3', color: '#3357FF' }, // blue
    // Add more sliders here
  ];

  return (
    <div className="space-y-6 p-6">
      {slidersData.map((slider, index) => (
        <div key={index} className="flex flex-col items-center">
          <label className="mb-2 text-lg">{slider.label}</label>
          <input
            type="range"
            className="w-full h-2 appearance-none rounded-lg"
            style={{
              background: slider.color, // Dynamic track color
            }}
          />
          <style jsx>{`
            input[type='range']::-webkit-slider-thumb {
              appearance: none;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #13191c; /* Black center */
              border: 3px solid ${slider.color}; /* Colored outline */
              cursor: pointer;
            }           
          `}</style>
        </div>
      ))}
    </div>
  );
};

export default SliderComponent;
