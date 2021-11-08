
  
import React, { useCallback, useEffect, useState } from "react";
import { placeholder } from "../utils/placeholder";

const defaultProps = {
  placeholderImg: placeholder,
  errorImg: placeholder,
};

export function LazyImage({
  alt,
  src,
  placeholderImg,
  errorImg,
  ...props
}) {
  const [imgSrc, setSrc] = useState(placeholderImg || src);

  const onLoad = useCallback(() => {
    setSrc(src);
  }, [src]);

  const onError = useCallback(() => {
    setSrc(errorImg || placeholderImg);
  }, [errorImg, placeholderImg]);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src, onLoad, onError]);

  return <img {...props} alt={alt} src={imgSrc} />;
}

LazyImage.defaultProps = defaultProps;