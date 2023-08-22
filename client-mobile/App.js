import { NavigationContainer } from '@react-navigation/native';
import Navigate from './navigations';
import { StyleSheet } from 'react-native';
import { ApolloProvider } from "@apollo/client";
import client from "./config";



export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer style={styles.container}>
        <Navigate />
      </NavigationContainer>
    </ApolloProvider>
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
