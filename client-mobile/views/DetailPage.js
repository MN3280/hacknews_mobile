import { Card, Text } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useQuery } from "@apollo/client";
import { DETAIL_POST } from "../queries";


const DetailPage = ({ route, navigation }) => {
    const { id } = route.params;
    const { data, loading, error } = useQuery(DETAIL_POST, {
        variables: { postDetailId: id },
    });

    return (
        <ScrollView >
            <Card style={styles.container}>
                <Card.Content>
                    <View style={{ padding: 20 }}>
                        <Text style={styles.title} >{data?.postDetail?.title}</Text>
                        <Text style={styles.tags}>Author Name: {data?.postDetail?.authorName}</Text>
                    </View>
                    <Text style={styles.content}>{data?.postDetail?.content}</Text>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}
export default DetailPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 0,
        height: '100%',
    },
    title: {
        flex: 1,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10
    },
    tags: {
        color: "#333333",
    },
    content: {
        fontSize: 18,
        lineHeight: 1.5 * 18,
        textAlign: 'auto'
    }
});