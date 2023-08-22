import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import AboutPage from '../views/AboutPage';
import Stacked from "../components/Stacked"
import CategoryPage from '../views/CategoryPage';


const Tab = createBottomTabNavigator();

const StackPage = () => {
    return (
        <Stacked />
    )
}

export default function Navigate() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "HomePage") {
                    iconName = focused ? "home" : "home-outline";

                } else if (route.name === "About") {
                    iconName = focused
                        ? "ios-information-circle"
                        : "ios-information-circle-outline";
                } else if (route.name === "Category") {
                    // iconName = focused
                    //     ? "ios-information-circle"
                    //     : "ios-information-circle-outline";
                    iconName = focused ? "list" : "list-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
        })} >
            <Tab.Screen name="HomePage" component={StackPage} options={{ headerShown: false }} />
            <Tab.Screen name="Category" component={CategoryPage} />
            <Tab.Screen name="About" component={AboutPage} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});