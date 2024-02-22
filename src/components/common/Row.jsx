import React from "react";

function Row({ children, className, ...restProps }) {
  return (
    <div className={`flex ${className}`} {...restProps}>
    {children}
  </div>
  );
}

export default Row;
