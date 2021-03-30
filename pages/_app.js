import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  if (typeof document !== "undefined") {
    var root = document.getElementsByTagName("html")[0];
    root.setAttribute("class", "dark dark:bg-gray-900 h-full");

    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("class", "dark:bg-gray-900 dark:text-white h-full");
  }

  return <Component {...pageProps} />;
};

export default MyApp;
