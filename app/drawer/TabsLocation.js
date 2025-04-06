import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


import locationComponent from './(fLocations)';
import locationHistory from './(fLocations)/historyLocation';
import locationHistoryCard from './(fLocations)/historyLocationCard'

const Tab = createBottomTabNavigator();

export default function TabsLocation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#2196f3',
                tabBarInactiveTintColor: 'gray',
            })}
        >

            <Tab.Screen
                name="Ubicaciones"
                component={locationComponent}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="location" size={size} color={color} />
                    ),
                }} />
            <Tab.Screen
                name="Historial"
                component={locationHistory}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="location-history" size={size} color={color} />
                    ),
                }} />

            <Tab.Screen
                name="HistorialCard"
                component={locationHistoryCard}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="search-location" size={size} color={color} />
                    ),
                }} />
        </Tab.Navigator>
    );
}
