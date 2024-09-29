import React from 'react';

const Characterbox = ({ isSelected }) => {
  return (
    <div className="flex justify-center items-center h-full px-8 mt-16">
      <div
        className={`bg-white rounded-lg shadow-lg w-80 h-96 text-center transition-transform duration-300 transform ${
          isSelected ? 'shadow-2xl ring-2  shadow-white hover:scale-102' : ''
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Characterbox;
