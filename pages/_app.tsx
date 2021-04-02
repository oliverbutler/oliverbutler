import "../styles/globals.css";

import Head from "next/head";
import { ThemeProvider, useTheme } from "next-themes";

import Particles from "components/Particles";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { useEffect, useState } from "react";

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
    <div id="App">
      <Head>
        <title>Oliver Butler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar switchTheme={switchTheme} />

      {children}

      {/* <Particles /> */}
      <Footer />
    </div>
  );
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  );
};

export default MyApp;
