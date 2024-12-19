import React, { useState, useEffect } from 'react';
import {ScrollView, View, Text, FlatList, StyleSheet, Button,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';


const Historique = ({ navigation }) => {
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('historyResearch');
      const userData = await AsyncStorage.getItem('SessionUser');
      const userhistory = JSON.parse(userData)
      
      if (storedHistory) {
        
        let convert = JSON.parse(storedHistory);
        let filterdata =  convert.filter(item => item.email === userhistory.email);
        console.log(userhistory)
        console.log(convert)
        setHistory(filterdata);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique', error);
    }
  };

  useEffect(() => {
    getHistory(); // Récupérer l'historique lors du montage
  }, []);
   
  const handlePress = (input) =>{
     console.log(input)
     AsyncStorage.setItem('seartext', input);
     navigation.navigate('HomeTabs');
  }

  const renderItem = ({ item }) => (

    <TouchableOpacity onPress={()=>handlePress(item.input)} style={styles.historyItem}>
      <Text style={styles.text}>recherche: {item.input}</Text>
      <Text style={styles.text}>Date: {item.date}</Text>
    </TouchableOpacity>

  );

  // Fonction pour vider l'historique stocké
  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('historyResearch');
      setHistory([]); // Mettre à jour l'état après suppression
      console.log('Historique effacé');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'historique', error);
    }
  };

  return (
    <ScrollView >
        <View style={styles.container}>
      <Text style={styles.title}>Historique de Recherche</Text>
      
      {/* Affichage de la liste des historiques */}
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      
      </View>
    </ScrollView>
  );
};

// Styles de la page Historique
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default Historique;
