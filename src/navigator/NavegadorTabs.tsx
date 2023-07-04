import * as React from 'react';
import {Dimensions, View} from 'react-native';
import {
  BottomTabBar,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import NavegadorStack from './NavegadorStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import {SorteosProvider} from '../context/ContextoSorteos';
import PantallaGenerarBoletas from '../screens/PantallaGenerarBoletas';
import PantallaInfo from '../screens/PantallaInfo';
import { GenerarBoletasProvider } from '../context/ContextoGenerarBoletas';

const Tab = createBottomTabNavigator();

const ComponenteProveedorSorteos = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return <SorteosProvider>{children}</SorteosProvider>;
};

const ComPantallaSorteosProvider = () => {
  return (
    <ComponenteProveedorSorteos>
      <NavegadorStack />
    </ComponenteProveedorSorteos>
  );
};

const ComponenteProveedorBoletas = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return <GenerarBoletasProvider>{children}</GenerarBoletasProvider>;
};

const ComGenerarBoletasProvider = () => {
  return (
    <ComponenteProveedorBoletas>
      <PantallaGenerarBoletas />
    </ComponenteProveedorBoletas>
  );
};

const NavegadorTabs = () => {
  const theme = useTheme();
  const anchoVentana = Dimensions.get('window').width;
  const altoVentana = Dimensions.get('window').height;
  const anchoTabBar = anchoVentana - 60;
  const posicionTabBar = (anchoVentana - anchoTabBar) / 2;

  const estiloTabBarFlotando: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      bottom: 30,
      left: posicionTabBar,
      elevation: 0,
      width: anchoTabBar,
      borderRadius: 15,
      height: 65,
      // backgroundColor: '#ff0000',
      backgroundColor: theme.colors.secondaryContainer,
    },
    tabBarLabelStyle: {
      fontFamily: 'RobotoCondensed-Regular',
      fontSize: 16,
      marginBottom: 10,
    },
    tabBarIconStyle: {
      marginTop: 0,
    },
    tabBarActiveTintColor: theme.colors.error,
    tabBarInactiveTintColor: theme.colors.secondary,
  };

  const estiloTabBarFijo: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      elevation: 0,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      bottom: 0,
      height: 55,
      backgroundColor: theme.colors.secondaryContainer,
    },
    tabBarLabelStyle: {
      fontFamily: 'RobotoCondensed-Regular',
      fontSize: 16,
      marginBottom: 10,
    },
    tabBarIconStyle: {
      marginTop: 0,
    },
    tabBarActiveTintColor: theme.colors.error,
    tabBarInactiveTintColor: theme.colors.secondary,
  };

  return (
    <Tab.Navigator
      // Para hacer el fondo del tabBar transparente, usé este workaround
      tabBar={props => (
        <View
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
          }}>
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={estiloTabBarFijo}
      // initialRouteName="PantallaInicio"
      initialRouteName="PantallaGenerarBoletas"
      detachInactiveScreens={false}>
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Inicio',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="seal" color={color} size={size} />
          ),
        }}
        name="PantallaInicio"
        component={ComPantallaSorteosProvider}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Generar Boletas',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="slot-machine"
              color={color}
              size={size}
            />
          ),
        }}
        name="PantallaGenerarBoletas"
        component={ComGenerarBoletasProvider}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Info',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="information"
              color={color}
              size={size}
            />
          ),
        }}
        name="PantallaInfo"
        component={PantallaInfo}
      />
    </Tab.Navigator>
  );
};

export default NavegadorTabs;
