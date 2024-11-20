import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Image, FlatList } from 'react-native';
import CustumHeader from './CustumHeader';
import { Button, Card, Avatar, IconButton , Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {Datas} from '../Constant/group_data'
import { Badge } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ route }) => {
  const [storedValue, setStoredValue] = useState('');
  const [searchQuery, setSearchQuery] = useState(storedValue);
  const [filteredData, setFilteredData] = useState([]);

  const getFromLocalStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('seartext');
      
        setStoredValue(value);
        if (value.length !== 0) {

          const response = require('../Constant/datas.json'); // Charge les données locales
      const newData = response.filter(item =>
        item.description.toLowerCase().includes(value.toLowerCase())
      );
          setFilteredData(newData);   
          console.log('mot', value);
         
        
      } else {
        setStoredValue('Aucune valeur entrée');
      }
    } catch (e) {
      console.error('Erreur lors de la récupération :', e);
    }
  };

  useEffect(() => {
    getFromLocalStorage();
  }, []);
  const navigation = useNavigation();
  


  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('Details', { item })}>
      <Card.Title
        title={item.category}
        subtitle={item.title}
        left={(props) =><Avatar.Image size={50}  source={{uri:item.image}}></Avatar.Image>}
      />
    </Card>
  );

  return ( 
    <View >
      <CustumHeader head={true} text={storedValue}/>
      
      <View style={styles.container}>

      <Text style={styles.title}>Resultats </Text>

      {
        filteredData.length!=0?
        <FlatList
        data={filteredData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        //keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />:
      <Text> Aucun resultat trouvé</Text>
      }

      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8,
  },
  search: {
    backgroundColor: 'white',
    width: '100%',
    alignItems:'center'
  },
  searchInput: {
    height: 40,

    width: '90%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  title: {
    fontWeight: 'bold',
    padding: 10,
    fontSize: 20,
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 10,
  },
  cardImage: {
    width: 'auto',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 8,
  },
});

export default HomeScreen;