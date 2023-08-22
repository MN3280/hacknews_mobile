import { Text } from "react-native-paper"
import { FlatList, Pressable, View } from "react-native"
import CardContent from "../components/CardContent"
import { useQuery, useLazyQuery } from "@apollo/client";
import { POST_BY_CATEGORY, GET_CATEGORY } from "../queries"
import { List } from 'react-native-paper';
import * as React from 'react';
import { StyleSheet } from 'react-native';


const CategoryPage = ({ navigation }) => {
    const { data: dataCat, loading, error } = useQuery(GET_CATEGORY);

    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    const [getPostsByCategory, { data }] = useLazyQuery(POST_BY_CATEGORY);

    const renderByCategory = (id) => {
        getPostsByCategory({
            variables: { postByCategoryId: id },
        });
    };
    const handleButtonPress = (id) => {
        renderByCategory(id);

    };
    const detailPage = (id) => {
        navigation.navigate("Detail", {
            id
        })
    }

    return (
        <>
            <View>
                <List.Section title="Category">
                    <List.Accordion
                        title="Select by category"
                        left={props => <List.Icon {...props} icon="folder" />}
                    >
                        {dataCat?.categories?.map(el => (
                            <List.Item
                                onPress={() => handleButtonPress(el.id)}
                                key={el.id}
                                title={el.name}
                            />
                        ))}
                    </List.Accordion>
                </List.Section>

                {loading ? (
                    <Text>Loading...</Text>
                ) : error ? (
                    <Text>Error: {error.message}</Text>
                ) : (
                    <FlatList
                        data={data?.postByCategory}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.card}
                                key={item.id}
                                onPress={() => detailPage(item.id)}
                            >
                                <CardContent item={item} />
                            </Pressable>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                )}
            </View>
        </>
    )
}

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
export default CategoryPage

