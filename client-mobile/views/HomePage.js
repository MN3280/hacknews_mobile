import { Text } from 'react-native-paper';
import CardContent from '../components/CardContent';
import { FlatList, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { useQuery } from "@apollo/client";
import { GET_POST } from '../queries';


const HomePage = ({ navigation }) => {
    const { data, loading, error } = useQuery(GET_POST);
    const detailPage = (id) => {
        navigation.navigate("Detail", {
            id
        })
    }

    if (loading) return <Text>Loading ...</Text>;
    if (error) return <Text>{error.message}</Text>;
    return (
        <>
            <FlatList data={data.posts} renderItem={({ item }) =>
                <Pressable style={styles.card} keyExtractor={item => item.id} onPress={() => detailPage(item.id)}>
                    <CardContent item={item} />
                </Pressable>
            }
            ></FlatList>
        </>
    )
}
export default HomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,

    },

});