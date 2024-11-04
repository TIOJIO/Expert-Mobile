
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import des icônes MaterialIcons
import LoginScreen from './Auth/LoginScrem';
import HomeScreen from './Screems/HomeScreem';
import ViewScreen from './Screems/ViewScreem';
import AccountScreen from './Screems/AccountScreem';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
     <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'View') {
            iconName = 'visibility';
          } else if (route.name === 'Account') {
            iconName = 'account-circle';
          }

          // Retourne l'icône MaterialIcons correspondante
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#003366',  // Couleur des icônes actives
        tabBarInactiveTintColor: 'gray',  // Couleur des icônes inactives
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="View" component={ViewScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
       
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
     
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}



/*
// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './Auth/LoginScrem';
import HomeScreen from './Screems/HomeScreem';
import ViewScreen from './Screems/ViewScreem';
import AccountScreen from './Screems/AccountScreem';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="View" component={ViewScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/