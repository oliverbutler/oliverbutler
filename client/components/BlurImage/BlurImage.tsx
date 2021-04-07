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
    <>
      <div className={classNames(className, "py-0 my-0", styles.container)}>
        <BlurhashCanvas
          className={classNames(className, styles.blur, {
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
      {caption && <p className="text-center mt-1">{image.caption}</p>}
    </>
  );
};

export default BlurImage;
