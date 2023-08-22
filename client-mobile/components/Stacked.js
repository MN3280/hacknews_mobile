import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailPage from '../views/DetailPage';
import HomePage from '../views/HomePage';
const Stack = createNativeStackNavigator();


const Stacked = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Posts" component={HomePage} />
            <Stack.Screen name="Detail" component={DetailPage} />
        </Stack.Navigator>
    );
}

export default Stacked