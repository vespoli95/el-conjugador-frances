type GoogleMobileAdsModule = typeof import("react-native-google-mobile-ads");

let cachedModulePromise: Promise<GoogleMobileAdsModule | null> | null = null;

export async function loadGoogleMobileAdsModule() {
  if (cachedModulePromise) {
    return cachedModulePromise;
  }

  cachedModulePromise = import("react-native-google-mobile-ads").catch(
    () => null,
  );

  return cachedModulePromise;
}

export async function initAds() {
  const googleMobileAds = await loadGoogleMobileAdsModule();

  if (!googleMobileAds?.default) {
    return;
  }

  try {
    await googleMobileAds.default().initialize();
  } catch {
    // Ignore native initialization failures so the rest of the app can still boot.
  }
}
