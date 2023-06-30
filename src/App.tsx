import * as React from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Card,
  Text,
  adaptNavigationTheme,
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  MD3Colors,
  Button,
} from 'react-native-paper';
import NavegadorTabs from './navigator/NavegadorTabs';
import merge from 'deepmerge';
import {View, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

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
  const [conectado, setConectado] = useState<boolean | null>(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setConectado(state.isConnected);
    });
  }, []);

  return (
    <>
      {!conectado ? (
        <View
          style={{
            flex: 1,
            backgroundColor: MD3Colors.neutral30,
            padding: 10,
            alignItems: 'center',
            paddingTop: 50,
          }}>
          <Card style={{width: '80%'}}>
            <Card.Content style={{padding:10}}>
              <Text variant="titleLarge">Sin Conexión</Text>
              <Text variant="bodyMedium">
                Por favor conectese a Internet e intente nuevamente
              </Text>
            </Card.Content>
            <Card.Cover
              style={{
                minHeight: 300,
                minWidth: 300,
                maxHeight: 350,
                maxWidth: 350,
              }}
              source={require('../src/assets/images/noconnection.png')}
            />
          </Card>
        </View>
      ) : (
        <PaperProvider theme={colorScheme === 'light' ? themeLightFinal : themeDarkFinal}>
          <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaProvider>
              <NavigationContainer
                theme={
                  colorScheme === 'light' ? themeLightFinal : themeDarkFinal
                }>
                <NavegadorTabs />
              </NavigationContainer>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </PaperProvider>
      )}
    </>
  );
};

export default App;
