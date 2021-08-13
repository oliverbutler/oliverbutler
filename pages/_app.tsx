import "../styles/globals.css";

import Head from "next/head";
import { ThemeProvider, useTheme } from "next-themes";

import { Footer } from "components/Footer/Footer";
import { Navbar } from "components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { MarkdownProvider } from "components/Markdown/MarkdownProvider";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon";
    }
  }
}

if (typeof window !== "undefined" && process.env.NODE_ENV === "production")
  console.log(
    "%cHey there! ❤️ \nLook at you being all adventurous, have fun! https://github.com/oliverbutler ",
    "font-size: 1.2rem; font-family: monospace; padding: 1rem; color: rgb(105, 99, 224); "
  );

const Wrapper = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };
  return (
    <div id="App" className="flex flex-col">
      <Head>
        <title>Oliver Butler</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.esm.js"
        ></script>
      </Head>

      <Navbar switchTheme={switchTheme} />

      <div id="Content" className="flex-grow ">
        {children}
      </div>
      <Footer />
    </div>
  );
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <MarkdownProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </MarkdownProvider>
    </ThemeProvider>
  );
};

export default MyApp;
