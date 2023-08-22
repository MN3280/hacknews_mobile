import { Button, Card, Text } from 'react-native-paper';
import { StyleSheet, Pressable, View } from 'react-native';


const CardContent = ({ item }) => {
    const imgUrl = item.imgUrl

    return (
        <Card style={{ backgroundColor: '#fff' }}>
            <Card.Cover source={{ uri: imgUrl }} style={styles.image} />
            <View style={{ padding: 16 }}>
                <Card.Content >
                    <Text variant="titleLarge" style={styles.title}>{item.title}</Text>
                    <View style={styles.tags} >
                        <Text style={{ padding: 2, fontWeight: 'bold' }}>Tags:</Text>
                        {item?.Tags?.map((el, index) => {
                            return (
                                <Pressable key={el.id} >
                                    <Text style={styles.tags}>{el.name}</Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </Card.Content>
            </View>
        </Card>
    )
}
export default CardContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        padding: 3
    },
    title: {
        flex: 1,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16
    },
    user: {
        fontSize: 16,
        paddingBottom: 10
    },
    tags: {
        flexDirection: 'row',
        color: "#333333",
        padding: 2,
        fontSize: 15,
    }
});


