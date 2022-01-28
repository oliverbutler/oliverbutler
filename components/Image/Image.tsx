import NextImage, { ImageProps as NextImageProps } from "next/image";

interface ImageProps extends NextImageProps {
  className?: string;
  style?: React.CSSProperties;
  caption?: React.ReactNode;
}

export const Image: React.FunctionComponent<ImageProps> = ({
  className,
  style,
  caption,
  ...props
}) => {
  return (
    <div className={className} style={style}>
      <NextImage {...props} />
      <div className="text-sm text-gray-400">{caption}</div>
    </div>
  );
};
