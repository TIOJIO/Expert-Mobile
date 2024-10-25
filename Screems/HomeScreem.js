import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
   const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer un mot clé pour la recherche');
    } else {
      // Logique pour consommer les données de l'API de Facebook
      // fetchDataFromFacebookAPI(searchQuery);
      Alert.alert('Recherche', `Recherche pour : ${searchQuery}`);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher dans les forums..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <View style={styles.searchButton}>
          <Button title="Rechercher" onPress={handleSearch} />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  searchButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});