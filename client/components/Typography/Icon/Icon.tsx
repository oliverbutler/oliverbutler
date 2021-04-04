import React from "react";

const Icon = ({ icon, text }) => {
  return (
    <div className="flex flex-row">
      <ion-icon name={icon}></ion-icon> <p className="ml-0.5">{text}</p>
    </div>
  );
};

export default Icon;
