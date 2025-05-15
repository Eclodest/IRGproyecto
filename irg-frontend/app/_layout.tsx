import { useFonts } from 'expo-font';
import { SplashScreen, Slot } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Playfair: require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) SplashScreen.preventAutoHideAsync();
    else SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar backgroundColor="#2b2b2b" barStyle="light-content" translucent={false} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#2b2b2b' }}>
        <Slot />
      </SafeAreaView>
    </>
  );
}
