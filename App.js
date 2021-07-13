import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { config } from "./config";
import Route from "./src/Route";
import { RecoilRoot } from "recoil";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { SWRConfig } from "swr";
import Init from "./src/Init";

const fetcher = (key) =>
  fetch(config.baseUrl + "wp-json/wprne/v1/" + key).then((r) => r.json());

export default function App() {
  const { colorMode, colorTheme } = config;
  const theme =
    colorMode === "dark"
      ? { ...eva.dark, ...colorTheme }
      : { ...eva.light, ...colorTheme };

  return (
    <View style={{ flex: 1 }}>
      <Init />
      <RecoilRoot>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            refreshInterval: 0,
            errorRetryCount: 3,
            fetcher,
          }}
        >
          <ApplicationProvider {...eva} theme={theme}>
            <SafeAreaProvider>
              <Route />
            </SafeAreaProvider>
          </ApplicationProvider>
        </SWRConfig>
      </RecoilRoot>
    </View>
  );
}
