import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Image, FlatList } from 'react-native';
import CustumHeader from '../CustumHeader';
import { Button, Card, Avatar, IconButton , Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {Datas} from '../../Constant/data';
import {  Dialog, Portal, PaperProvider,Checkbox } from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(Datas);
  const [checked, setChecked] = React.useState(false);

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
    <PaperProvider>
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
            icon="filter" 
            mode="contained" 
            onPress={showDialog}
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

     <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Personnaliser vos Recherches</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">data et heure<Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                </Text>
                <Text variant="bodyMedium">Caracteristique<Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                </Text>
                <Text variant="bodyMedium">commentaires des utilisateurs<Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                </Text>
              
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Valider</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </PaperProvider>
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
