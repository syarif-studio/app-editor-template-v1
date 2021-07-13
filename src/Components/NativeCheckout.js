import React from "react";
import { Layout } from "@ui-kitten/components";
import { BillingTab } from "./NativeCheckout/BillingTab";
import { ShippingTab } from "./NativeCheckout/ShippingTab";

export const NativeCheckout = ({
  style,
  fields,
  checkoutUrl,
  placeOrderTitle,
}) => {
  return (
    <Layout style={style}>
      <BillingTab fields={fields} />
      <ShippingTab
        checkoutUrl={checkoutUrl}
        placeOrderTitle={placeOrderTitle}
      />
    </Layout>
  );
};
