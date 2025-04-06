import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

// Importamos el componente original
// Asegúrate de que la ruta de importación sea correcta según tu estructura de archivos
import RickComponent from './(bRickAndMorty)';
import RickEpisodes from './(bRickAndMorty)/episodesRickView';
import RickLocations from './(bRickAndMorty)/locationRickView';


// Crear el Tab Navigator
const Tab = createBottomTabNavigator();

// Componente con tabs que utilizarás en tu Drawer
export default function RickAndMortyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Oculta el header para evitar duplicación con el header del Drawer
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Personajes"
        component={RickComponent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Episodios"
        component={RickEpisodes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="ondemand-video" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Locaciones"
        component={RickLocations}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="world-o" size={size} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}