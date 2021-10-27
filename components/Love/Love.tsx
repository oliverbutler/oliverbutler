import classNames from "classnames";
import React from "react";

const TIMING = 150;
const CLICK_MAX = 5;

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}
export const Love: React.FunctionComponent<Props> = ({ className }) => {
  const [hover, setHover] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);
  const [timesClicked, setTimesClicked] = React.useState(2);

  const style = {
    transform: isClicked ? `rotate(15deg)` : `rotate(0deg)`,
    transition: `transform ${TIMING}ms`,
  };

  React.useEffect(() => {
    if (!isClicked) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsClicked(false);
    }, TIMING);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isClicked]);

  return (
    <div className={classNames("text-center", className)}>
      <svg
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height={35}
        width={35}
        className="transition-all cursor-pointer select-none"
        onMouseEnter={() => {
          setHover(true);
          setIsClicked(true);
        }}
        onMouseLeave={() => setHover(false)}
        onClick={() => setIsClicked(true)}
      >
        <title>Heart</title>
        <path
          d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
          fill={hover ? "red" : "none"}
          stroke={hover ? "red" : "currentColor"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
      </svg>
      <p>125</p>
    </div>
  );
};
