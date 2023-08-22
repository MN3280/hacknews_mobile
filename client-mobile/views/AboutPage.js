import { Card, Text } from "react-native-paper"
import React, { useCallback } from 'react';
import { Alert, Button, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const supportedURL = 'https://github.com/MN3280';
const handlePress = async () => {
    await Linking.openURL(supportedURL);
};

const AboutPage = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text} >
                    HACK is a cutting-edge platform that keeps you in the loop about the latest happenings and trending topics. With user-friendly interface, staying updated on developers' challenges and fostering a supportive community has never been simpler - whether you're on your phone, computer, tablet, or any other device.
                </Text>
                <Text style={styles.dev}>Developed by: Martini</Text>
                <TouchableOpacity onPress={handlePress}>
                    <Ionicons name="logo-github" size={30} color="black" />
                </TouchableOpacity>


            </View>

        </>
    )
}
export default AboutPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        backgroundColor: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 1.5 * 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    dev: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 10,
    }
})