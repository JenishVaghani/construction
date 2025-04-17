import React from "react";
import { IMAGE404 } from "../../utils/constants";

function NotFoundPage() {
  const image404 = IMAGE404;

  return (
    <div className="max-w-screen min-h-screen flex items-center justify-center bg-[#E3F6FC] overflow-hidden">
      <img
        src={image404.img}
        alt={image404.name}
        className="w-full h-full object-scale-down"
      />
    </div>
  );
}

export default NotFoundPage;
