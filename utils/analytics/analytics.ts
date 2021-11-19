import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-G146XRC7V0");
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
