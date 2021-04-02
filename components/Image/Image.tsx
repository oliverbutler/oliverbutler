// import React from "react";

// const Image = ({ src, alt, className }) => {
//   return (
//     <div>
//       <img
//         src={process.env.NEXT_PUBLIC_SERVER_URL + src}
//         alt={alt}
//         className={className}
//       />
//     </div>
//   );
// };

// export default Image;

import React, { FC } from "react";
import { default as NextImage } from "next/image";

import styles from "./Image.module.scss";
import { Blurhash, BlurhashCanvas } from "react-blurhash";

interface StrapiImageProps {
  url: string;
  blurHash: string;
}

interface ImageProps {
  image?: StrapiImageProps;
  src?: string;
  blur?: boolean;
  style?: React.CSSProperties;
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
}

/**
 * Improves next/image through allowing you to not specify width or height,
 */
const Image: FC<ImageProps> = ({
  image,
  src,
  blur,
  className,
  alt,
  width,
  height,
}) => {
  var imgSrc = process.env.NEXT_PUBLIC_SERVER_URL + src;
  var fixed = false;
  var altText = alt;

  // if (image && image.alternativeText) altText = image.alternativeText;

  if (image) {
    imgSrc = process.env.NEXT_PUBLIC_SERVER_URL + image.url;
  }

  if (width && height) fixed = true;

  if (!image) blur = false;

  if (blur && image.blurHash == "") blur = false;

  if (!imgSrc) {
    return (
      <div>
        <p>Missing Photo</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className={
          styles.image +
          " " +
          (fixed ? styles.fixed : "") +
          " " +
          (blur ? styles.blur : "")
        }
      >
        {blur && (
          <BlurhashCanvas
            className={styles.blur}
            hash={image.blurHash}
            punch={1}
          />
        )}
        {fixed ? (
          <NextImage src={imgSrc} width={width} height={height} alt={altText} />
        ) : (
          <NextImage src={imgSrc} layout="fill" alt={altText} />
        )}
      </div>
    </div>
  );
};

export default Image;
