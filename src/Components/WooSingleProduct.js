import React from "react";
import { Layout } from "@ui-kitten/components";
import { SingleProductRoot } from "../Hook";

export * from "./WooSingleProduct/WooImageCarousel";
export * from "./WooSingleProduct/WooProductVariations";
export * from "./WooSingleProduct/WooAddToCart";
export * from "./WooSingleProduct/WooProductRating";

export const WooSingleProduct = ({ children }) => {
  return (
    <Layout style={{ flex: 1 }}>
      <SingleProductRoot>{children}</SingleProductRoot>
    </Layout>
  );
};
