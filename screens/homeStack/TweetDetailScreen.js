import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import TweetContent from '../../components/TweetContent'
const TweetDetailScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: params.tweet.author.name
        })
    }, [])
    const { params } = route
    return (
        <SafeAreaView style={styles.container}>
            <Button title='Go Back' onPress={() => navigation.goBack()} />

            <TweetContent tweet={params.tweet} />
        </SafeAreaView>
    )
}

export default TweetDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})