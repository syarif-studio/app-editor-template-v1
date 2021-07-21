import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { config } from "./config";
import Route from "./src/Route";
import { RecoilRoot } from "recoil";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { SWRConfig } from "swr";
import { default as mappingFont } from "./mapping.json";
import { useFonts } from "expo-font";
import fontRegular from "./assets/fonts/font-regular.ttf";
import fontBold from "./assets/fonts/font-bold.ttf";
import fontSemibold from "./assets/fonts/font-semibold.ttf";
import Init from "./src/Init";

const fetcher = (key) =>
  fetch(config.baseUrl + "wp-json/wprne/v1/" + key).then((r) => r.json());

export default function App() {
  const [fontsLoaded] = useFonts({
    "Font-Regular": fontRegular,
    "Font-Bold": fontBold,
    "Font-SemiBold": fontSemibold,
  });

  const { colorMode, colorTheme } = config;
  const theme =
    colorMode === "dark"
      ? { ...eva.dark, ...colorTheme }
      : { ...eva.light, ...colorTheme };
  const mapping =
    Platform.OS === "android"
      ? {
          components: {
            Popover: {
              meta: { parameters: { top: { type: "number" } } },
              appearances: {
                default: {
                  mapping: { top: insets.top },
                },
              },
            },
          },
          ...mappingFont,
        }
      : mappingFont;

  if (!fontsLoaded) {
    return null;
  }

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
          <ApplicationProvider {...eva} theme={theme} customMapping={mapping}>
            <SafeAreaProvider>
              <Route />
            </SafeAreaProvider>
          </ApplicationProvider>
        </SWRConfig>
      </RecoilRoot>
    </View>
  );
}
