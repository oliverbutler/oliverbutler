import React, { FC } from "react";
import NextImage from "next/image";

import styles from "./BlurImage.module.scss";
import { BlurhashCanvas } from "react-blurhash";
import classNames from "classnames";

interface StrapiImageProps {
  url: string;
  blurHash: string;
  width: number;
  height: number;
  alternativeText: string;
  caption: string;
}

interface ImageProps {
  image: StrapiImageProps;
  className?: string;
  rounded?: boolean;
  fixed?: boolean;
  caption?: boolean;
}

type CaptionWrapperProps = {
  caption: string;
  children?: any;
};

const CaptionWrapper = ({ caption, children }: CaptionWrapperProps) => {
  if (caption) {
    return (
      <>
        {children}
        <p className="text-center mt-2">{caption}</p>
      </>
    );
  } else return children;
};

/**
 * Improves next/image through allowing you to not specify width or height,
 */
const BlurImage: FC<ImageProps> = ({
  image,
  className,
  rounded = false,
  fixed,
  caption,
}) => {
  return (
    <CaptionWrapper caption={caption ? image.caption : ""}>
      <div className={classNames(className, styles.container)}>
        <BlurhashCanvas
          className={classNames(styles.blur, {
            "rounded-full": rounded,
          })}
          hash={image.blurHash}
          punch={1}
        />
        {fixed ? (
          <NextImage
            src={image.url}
            width={image.width}
            height={image.height}
            // layout="fill"
            alt={image.alternativeText}
            className={classNames(className, { "rounded-full": rounded })}
          />
        ) : (
          <NextImage
            src={image.url}
            layout="fill"
            alt={image.alternativeText}
            className={classNames(className, { "rounded-full": rounded })}
          />
        )}
      </div>
    </CaptionWrapper>
  );
};

export default BlurImage;
