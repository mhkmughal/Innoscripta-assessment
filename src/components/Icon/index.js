import React from "react";

export default function Icon({
  src,
  alt = "",
  onClick,
  className = "w-5 h-5 cursor-pointer",
}) {
  return <img src={src} alt={alt} className={className} onClick={onClick} />;
}
