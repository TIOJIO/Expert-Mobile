import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Button, Card, Avatar, IconButton , Icon } from 'react-native-paper';


const DetailScreen = ({ route }) => {
  const { item } = route.params; // Récupérer l'élément passé via la navigation

  // Créez une valeur animée pour la rotation
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Lance une animation de rotation 3D en boucle
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: -1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [rotation]);

  // Appliquez une interpolation pour créer l'effet 3D de rotation
  const animatedStyle = {
    transform: [
      {
        rotateY: rotation.interpolate({
          inputRange: [-1, 1],
          outputRange: ['-15deg', '15deg'], // Réglez l'angle de rotation en 3D
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      
      {/* Appliquez le style animé à l'image */}
      <Animated.Image source={item.image} style={[styles.image, animatedStyle]} />
      
      <Text style={styles.description}>{item.description}</Text>

      <Card.Actions>
        <Button style={{width:80,height:40}}> <Icon source="message"size={20}/></Button>
        <Button style={{width:80,height:40}}> <Icon source="share"size={20}/></Button>
      </Card.Actions>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailScreen;
