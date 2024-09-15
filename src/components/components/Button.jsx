import React from "react";
import google from "../../images/google.png";

function Button({
  text,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  id,
  ...prop
}) {
  return (
    <button
      type={type}
      className={` px-4 py-2 m-3 rounded-lg w-full ${bgColor} ${textColor} ${className}`}
      {...prop}
    >
      {id ? (
        <div className="flex items-center gap-3 justify-center ">
          <img src={google} alt="" height={30} width={30} />
          {text}
        </div>
      ) : (
        text
      )}
    </button>
  );
}

export default Button;
