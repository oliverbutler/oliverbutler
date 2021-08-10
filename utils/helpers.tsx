import { ReactNode } from "react";

interface Props {
  condition: any;
  wrapper: (children: ReactNode) => any;
}

export const ConditionalWrapper: React.FunctionComponent<Props> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : children);
