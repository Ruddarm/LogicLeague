import React from 'react'
import Style from './loading.module.css'
 const Loader = () => {
  return (
    <>
      <div className={Style.loadingContainer}>
        <div className={Style.spinner}></div>
        <span>running ...</span>
      </div>
    </>
  );
};

export default Loader