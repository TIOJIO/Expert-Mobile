
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import des icônes MaterialIcons
import DetailScreen from './Screems/DetailScreem';
import Home_car from './Screems/groupe_car/Home_car';
import Detail_car from './Screems/groupe_car/Detail_car';
import HomeScreen from './Screems/HomeScreem';

const Stack = createNativeStackNavigator();



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
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Home_car" component={Home_car} options={{ headerShown: false }}/>
          <Stack.Screen name="Details" component={Detail_car}  />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

