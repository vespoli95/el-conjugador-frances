import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { loadGoogleMobileAdsModule } from "@/lib/adMob";

type BannerAdModule = {
  BannerAd: typeof import("react-native-google-mobile-ads").BannerAd;
  BannerAdSize: typeof import("react-native-google-mobile-ads").BannerAdSize;
  TestIds: typeof import("react-native-google-mobile-ads").TestIds;
};

export default function BannerAdViewComponent() {
  const [bannerAdModule, setBannerAdModule] = useState<BannerAdModule | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;

    void loadGoogleMobileAdsModule().then((googleMobileAds) => {
      if (
        !isMounted ||
        !googleMobileAds?.BannerAd ||
        !googleMobileAds.BannerAdSize ||
        !googleMobileAds.TestIds
      ) {
        return;
      }

      setBannerAdModule({
        BannerAd: googleMobileAds.BannerAd,
        BannerAdSize: googleMobileAds.BannerAdSize,
        TestIds: googleMobileAds.TestIds,
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!bannerAdModule) {
    return null;
  }

  const { BannerAd, BannerAdSize, TestIds } = bannerAdModule;
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-3335799351913570/1077579538";

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
