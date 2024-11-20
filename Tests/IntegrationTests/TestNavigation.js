import { render, screen, fireEvent } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { Datas } from '../Constant/group_data';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));

describe('HomeScreen', () => {
  test('navigation vers le détail du groupe et passage de données', () => {
    const { navigate } = useNavigation();

    render(<HomeScreen />);

    // Localiser un élément de la liste
    const groupElement = screen.getByText(Datas[0].name);
    fireEvent.press(groupElement);

    // Vérifier que la navigation a eu lieu et les données ont été transmises
    expect(navigate).toHaveBeenCalledWith('Home_car', { item: Datas[0] });
  });
});
