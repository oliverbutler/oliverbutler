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
}

interface ImageProps {
  image: StrapiImageProps;
  className?: string;
  rounded?: boolean;
  fixed?: boolean;
}

/**
 * Improves next/image through allowing you to not specify width or height,
 */
const BlurImage: FC<ImageProps> = ({
  image,
  className,
  rounded = false,
  fixed,
}) => {
  return (
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
  );
};

export default BlurImage;
