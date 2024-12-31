import React from 'react'
import Style from './loading.module.css'
 const Loader = ({msg}) => {
  return (
    <>
      <div className={Style.loadingContainer}>
        <div className={Style.spinner}></div>
        <span>{msg}</span>
      </div>
    </>
  );
};

export default Loader