import React from "react";
import logo from "../../assets/logo2.png";

const Logo = () => {
  return (
    <div className="w-full py-6 flex justify-center">
      <div className="flex items-center gap-3">
        {/* Logo Icon */}
        <div className="flex items-center justify-center">
          <img className="w-[42px]" src={logo} alt="logo" />
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-semibold text-white tracking-wide">
          Accountia
        </h1>
      </div>
    </div>
  );
};

export default Logo;
