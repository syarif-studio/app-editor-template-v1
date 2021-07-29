import React from "react";
import { Image as ImageUi } from "react-native";
import { usePostImage } from "../Hook";
import placeholder from "../../assets/placeholder.png";

export const Image = ({ source, postContent, ...props }) => {
  const postImage = usePostImage(postContent);

  source = postContent !== "disable" ? postImage : source;
  const { style, ...restProps } = props;

  let imgSrc = placeholder;
  if (source) {
    imgSrc = { uri: source };
  }

  return <ImageUi style={style} source={imgSrc} {...restProps} />;
};
