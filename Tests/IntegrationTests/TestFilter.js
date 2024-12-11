import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { Datas } from '../Constant/group_data';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));

describe('HomeScreen', () => {
  test('la recherche filtre correctement les données affichées', async () => {
    render(<HomeScreen />);

    // Localiser le champ de recherche et saisir un texte
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'Group 1');

    // Vérifier que l'affichage a été mis à jour
    await waitFor(() => {
      expect(screen.getByText('Group 1')).toBeTruthy();
    });

    // Vérifier qu'un autre groupe qui ne correspond pas à la recherche n'est pas affiché
    expect(screen.queryByText('Group 2')).toBeNull();
  });
});
