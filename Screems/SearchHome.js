import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
     AsyncStorage.removeItem('seartext');
    setLoading(true)
    if (input.trim()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
         AsyncStorage.setItem('seartext', input);
        navigation.navigate('HomeTabs');
       
      }, 2000);
    } else {
      setLoading(false)
      alert('veillez entrer une recherche !')
      console.log("Champ de saisie vide !");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenue</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre recherche"
        value={input}
        onChangeText={setInput}
      />
      {
        loading===false?
        <Button title="Rechercher" onPress={handleSearch} />
        :
        <ActivityIndicator size="large" color="#FFFFFF" />
      }
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003366',
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgb(0, 51, 102)',
    opacity: 0.6,
  },
});

export default SearchScreen;