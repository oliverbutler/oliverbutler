import { motion } from "framer-motion";
import React from "react";

import { useTheme } from "next-themes";

const Navbar = ({ switchTheme }) => {
  // const [colourTheme, setTheme] = useDarkMode();

  const { theme, setTheme } = useTheme();

  const variants = {
    dark: { x: 15 },
    light: { x: -5 },
  };

  return (
    <header className="body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base mr-auto">
          <a className="mr-5 hover:text-black hover:dark:text-white z-10 cursor-pointer">
            Projects
          </a>
          <a className="mr-5 hover:text-black hover:dark:text-white z-10 cursor-pointer">
            Blog
          </a>
        </nav>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <button
            className="inline-flex items-center bg-gray-100 dark:bg-indigo-900  py-1 px-3 focus:outline-none dark:divide-transparent hover:bg-gray-200 dark:hover:bg-indigo-700 text-black dark:text-white rounded-xl text-base mt-4 md:mt-0 z-10"
            onClick={switchTheme}
          >
            <motion.div animate={theme} variants={variants}>
              <svg
                width="16"
                height="16"
                className="mr-2 fill-current dark:text-gray-400 text-gray-500
              "
              >
                <circle cx="8" cy="8" r="8" />
              </svg>
            </motion.div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
