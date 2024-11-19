import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));

// Mock de la fonction alert pour tester son appel
global.alert = jest.fn();

describe('HomeScreen', () => {
  test('affiche un message si aucune donnée n\'est trouvée', async () => {
    render(<HomeScreen />);

    // Localiser le champ de recherche
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeTruthy();

    // Simuler que l'utilisateur entre un texte qui ne correspond à aucune donnée
    fireEvent.changeText(searchInput, 'TexteQuiNExistePas');

    // Simuler la validation de la recherche (par exemple, avec "blur")
    fireEvent.blur(searchInput);

    // Vérifier que l'alerte "Aucune donnée trouvée" a bien été appelée
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Aucune donnée trouvée.');
    });

    // Vérifier que la liste est vide ou que le message d'absence de résultat est affiché
    expect(screen.queryByText('Aucune donnée trouvée.')).toBeTruthy();
  });
});
