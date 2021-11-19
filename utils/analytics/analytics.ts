import ReactGA from "react-ga";

export const initGA = () => {
  console.info("GA > GA init");
  ReactGA.initialize("G-R8Z2NRLPXK");
};
export const logPageView = () => {
  console.info(`GA > Logging page view for ${window.location.pathname}`);
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
export const logEvent = (category = "", action = "") => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};
export const logException = (description = "", fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
