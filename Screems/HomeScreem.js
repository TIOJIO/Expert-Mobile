import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Image, FlatList } from 'react-native';
import CustumHeader from './CustumHeader';
import { Button, Card, Avatar, IconButton , Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      name: 'Ferarie',
      description: 'A delicious red fruit A delicious red fruit A delicious red fruit A delicious red fruit A delicious red fruit.',
      image: require('../images/v1.png'), // Utilisez require pour une image locale
    },
    {
      id: 2,
      name: 'Mustande',
      description: 'A yellow tropical fruit A yellow tropical fruitA yellow tropical fruitA yellow tropical fruitA yellow tropical fruit.',
      image: require('../images/v2.png'),
    },
    {
      id: 3,
      name: 'Tesla',
      description: 'A citrus fruit rich in vitamin C A citrus fruit rich in vitamin CA citrus fruit rich in vitamin CA citrus fruit rich in vitamin C.',
      image: require('../images/v3.png'),
    },
    {
      id: 4,
      name: 'Porche',
      description: 'A citrus fruit rich in vitamin C A citrus fruit rich in vitamin CA citrus fruit rich in vitamin C.',
      image: require('../images/v4.png'),
    },
    {
      id: 5,
      name: 'Luxure',
      description: 'A citrus fruit rich in vitamin C.',
      image: require('../images/v5.png'),
    },
    // Ajoutez d'autres éléments si besoin
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const newData = data.filter((item) => 
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('Details', { item })}>
      <Card.Title
        title={item.name}
        subtitle={item.description}
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
      />
      <Image source={item.image} style={styles.cardImage} />
      <Card.Actions>
        <Button style={{width:80,height:40}}> <Icon source="message"size={20}/></Button>
        <Button style={{width:80,height:40}}> <Icon source="share"size={20}/></Button>
      </Card.Actions>
    </Card>
  );

  return ( 
    <View style={styles.container}>
      <CustumHeader />
      
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => handleSearch(text)}
        />
        <View style={styles.searchButton}>
          <Button 
            style={{backgroundColor:'#003366'}} 
            icon="magnify" 
            mode="contained" 
            onPress={() => handleSearch(searchQuery)}
          />
        </View>
      </View>

      <Text style={styles.title}>News Feed</Text>

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        //keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchInput: {
    height: 40,
    marginLeft: 10,
    width: '70%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  searchButton: {
    marginRight: 10,
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
