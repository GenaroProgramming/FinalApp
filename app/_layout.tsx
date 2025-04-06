import { useFonts } from "expo-font";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";
import { AuthProvider, useAuth } from "../app/context/AuthContext";
import BHomeScreen from "./drawer/RickTabs";
import CNotes from "./drawer/(cNotes)";
import DPermissions from "./drawer/(dPermissions)";
import EGallery from "./drawer/(eGallery)";
import GLocationHistory from "./drawer/TabsLocation"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FontAwesome6, Foundation, SimpleLineIcons } from "@expo/vector-icons";


SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();



export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

function RootLayout() {
  const { isAuthenticated } = useAuth();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isAuthenticated ? <AuthenticatedScreens /> : <UnauthenticatedScreens />}
    </GestureHandlerRootView>
  );
}

function AuthenticatedScreens() {
  return (
    <Drawer.Navigator
      screenOptions={({route})=> ({
        drawerStyle: {
          backgroundColor: "#ffffff",
        },
        drawerLabelStyle: {
          color: "#000",
        },
        drawerActiveTintColor: "#2196f3",
        drawerInactiveTintColor: "black",
      })}
    >
      <Drawer.Screen
        name="aRick"
        component={BHomeScreen}
        options={{
          title: "Rick And Morty",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="api" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="cNotes"
        component={CNotes}
        options={{
          title: "Notas",
          drawerIcon: ({ color, size }) => (
            <Foundation name="clipboard-notes" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="dPermissions"
        component={DPermissions}
        options={{
          title: "Permisos",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cellphone-lock" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="eGallery"
        component={EGallery}
        options={{
          title: "Galería",
          drawerIcon: ({ color, size }) => (
            <SimpleLineIcons name="picture" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="gLocation"
        component={GLocationHistory}
        options={{
          title: "Localizaciones",
          drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="map-location-dot" size={size} color={color} />
          ),
        }}
      />
      

    </Drawer.Navigator>
  );
}

function UnauthenticatedScreens() {
  return <Slot />;
}
