import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { Datas } from '../Constant/group_data';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));

// Mock de la fonction alert pour tester son appel
global.alert = jest.fn();

describe('HomeScreen', () => {
  test('affiche une alerte si le champ de recherche est vide', async () => {
    render(<HomeScreen />);

    // Localiser le champ de recherche
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeTruthy();

    // Simuler que l'utilisateur vide le champ de recherche
    fireEvent.changeText(searchInput, '');

    // Simuler la validation de la recherche
    fireEvent.blur(searchInput);

    // Vérifier que l'alerte a été appelée
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Le champ de recherche est requis.');
    });

    // Vérifier que toutes les données restent affichées (sans filtre)
    Datas.forEach((item) => {
      expect(screen.getByText(item.name)).toBeTruthy();
    });
  });
});
