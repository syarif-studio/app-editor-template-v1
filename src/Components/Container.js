import React from "react";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useAction, usePostContent } from "../Hook";

const ContainerView = ({ children, onPressAction, navigateTo, ...props }) => {
  const handleAction = useAction({ navigateTo });

  const handleOnPress = () => {
    if (Array.isArray(onPressAction) && onPressAction.length) {
      onPressAction.forEach((action) => {
        handleAction(action);
      });
    }
  };

  if (Array.isArray(onPressAction) && onPressAction.length) {
    return (
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <Layout {...props}>{children}</Layout>
      </TouchableWithoutFeedback>
    );
  }

  const isHorizontal = props.style?.flexDirection === "row";
  if (props.scrollable) {
    return (
      <Layout {...props}>
        <ScrollView
          horizontal={isHorizontal}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {children}
        </ScrollView>
      </Layout>
    );
  }

  return <Layout {...props}>{children}</Layout>;
};

const ContainerDynamicBackground = ({ style, ...props }) => {
  const { dynamicBackgroundColor, ...custStyle } = style;
  const backgroundColor = usePostContent(dynamicBackgroundColor);

  if (backgroundColor) {
    custStyle.backgroundColor = backgroundColor;
  }

  return <ContainerView {...props} style={custStyle} />;
};

export const Container = (props) => {
  const dynamicBackgroundColor = props.style.dynamicBackgroundColor;
  if (dynamicBackgroundColor && dynamicBackgroundColor !== "disable") {
    return <ContainerDynamicBackground {...props} />;
  }

  return <ContainerView {...props} />;
};
