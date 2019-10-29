import React from 'react';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <div className="circle">
        <div className="circle__occluder"></div>
      </div>
      <div className="circle circle--reverse">
        <div className="circle__occluder circle--reverse__occluder"></div>
      </div>
    </div>
  );
};
export default Loader;
