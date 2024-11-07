import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Image, FlatList } from 'react-native';
import CustumHeader from '../CustumHeader';
import { Button, Card, Avatar, IconButton , Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {Datas} from '../../Constant/data'

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
    <Card style={styles.card} onPress={() => navigation.navigate('Details', { item })}>
      <Card.Title
        title={item.name}
        subtitle={item.description}
        left={(props) => <Avatar.Image size={50}  source={item.userprofil}></Avatar.Image>}
        right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
      />
      <Image source={item.image} style={styles.cardImage} />
      <Text style={{textAlign:'right',marginRight:10}}>+ 100k commentaires</Text>
      <Card.Actions>
       
        <Button style={{width:80,height:40}}> <Icon source="message"size={20}/></Button>
        <Button style={{width:80,height:40}}> <Icon source="share"size={20}/></Button>
      </Card.Actions>
    </Card>
  );

  return ( 
    <View >
      <CustumHeader head={false}/>
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
      <View style={styles.container}>
        <Text style={styles.title}>News Feed</Text>

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
