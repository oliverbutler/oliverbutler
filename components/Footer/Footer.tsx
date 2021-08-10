import React from "react";

export const Footer = () => {
  return (
    <footer className="text-gray-400 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <p className="text-sm text-gray-400  sm:py-2 sm:mt-0 mt-4">
          © {new Date().getFullYear()} Oliver Butler
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start text-2xl">
          <a href="https://www.linkedin.com/in/oliver-butler/" className="mr-2">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
          <a href="https://github.com/oliverbutler">
            <ion-icon name="logo-github"></ion-icon>
          </a>
        </span>
      </div>
    </footer>
  );
};
