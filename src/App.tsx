import * as React from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  adaptNavigationTheme,
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import NavegadorTabs from './navigator/NavegadorTabs';
import merge from 'deepmerge';
import {useColorScheme} from 'react-native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const fontConfig = {
  fontFamily: 'RobotoCondensed-Regular',
};
const themeLightFinal = {
  ...CombinedDefaultTheme,
  fonts: configureFonts({config: fontConfig}),
};
const themeDarkFinal = {
  ...CombinedDarkTheme,
  fonts: configureFonts({config: fontConfig}),
};

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <PaperProvider
      theme={colorScheme === 'light' ? themeLightFinal : themeDarkFinal}>
      {/*
        Está la opción de usar el Navegador Drawer
        Pero por ahora arranco solo con el Bottom Tabs Navigator
      */}
      <NavigationContainer
        theme={colorScheme === 'light' ? themeLightFinal : themeDarkFinal}>
        <NavegadorTabs />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
