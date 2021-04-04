import "../styles/globals.css";

import Head from "next/head";
import { ThemeProvider, useTheme } from "next-themes";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "utils/apollo";

import Particles from "components/Particles";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { useEffect, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon";
    }
  }
}

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
        <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>
      </Head>

      <Navbar switchTheme={switchTheme} />

      <div id="Content" className="flex-grow ">
        {children}
      </div>
      {/* <Particles /> */}
      <Footer />
    </div>
  );
};

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);
  return (
    <ThemeProvider attribute="class">
      <ApolloProvider client={apolloClient}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default MyApp;
