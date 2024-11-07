import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Image, FlatList } from 'react-native';
import CustumHeader from './CustumHeader';
import { Button, Card, Avatar, IconButton , Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {Datas} from '../Constant/group_data'
import { Badge } from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(Datas);


  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const newData = Datas.filter((item) => 
         item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(Datas);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('Home_car', { item })}>
      <Card.Title
        title={item.name}
        subtitle={item.badge==0? ' Pas de nouvelle publication':'+ de '+item.badge+' nouvelles publication'}
        left={(props) =><Avatar.Image size={50}  source={item.image}></Avatar.Image>}
        right={(props) => item.badge==0?'':<Badge style={{marginRight:15}} >{item.badge}</Badge>}
      />
    </Card>
  );

  return ( 
    <View >
      <CustumHeader head={true}/>
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => handleSearch(text)}
        />

      </View>
      <View style={styles.container}>

      <Text style={styles.title}>Group List</Text>

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        //keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
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
