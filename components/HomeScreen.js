import React, { useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import * as Styles from "./styles"
import { Icon, Divider, Text } from 'react-native-elements';

export default function HomeScreen({ navigation }) {
    const styles = Styles.styles;

    return (
        <ScrollView>
            <View style={styles.homeStyles.container}>
                <View>
                    <Text h3 style={{
                        marginVertical: 20,
                        color: "#125c75",
                        maxWidth: '90%',
                        fontStyle: 'italic'
                    }}>Capture and track your expenses with the Expense Tracker App!</Text>
                    <Text h4 style={{ marginBottom: 10, color: '#138181' }}>Select a category to see your expenses / add an expense:</Text>
                    <Pressable style={styles.homeStyles.category1} onPress={() => navigation.navigate('Groceries')}>
                        <Icon
                            type="font-awesome"
                            color='#e5efc1'
                            name="shopping-cart"
                            size={25}
                        />
                        <Text style={styles.homeStyles.buttonTitle}>Groceries</Text>
                    </Pressable>
                    <Pressable style={styles.homeStyles.category2} onPress={() => navigation.navigate('Health and Beauty')}>
                        <Icon
                            type="font-awesome"
                            color='#e5efc1'
                            name="flask"
                            size={25}
                        />
                        <Text style={styles.homeStyles.buttonTitle}>Health and Beauty</Text>
                    </Pressable>
                    <Pressable style={styles.homeStyles.category3} onPress={() => navigation.navigate('Restaurants and Bars')}>
                        <Icon
                            type="font-awesome"
                            color='#e5efc1'
                            name="glass"
                            size={25}
                        />
                        <Text style={styles.homeStyles.buttonTitle}>Restaurants and Bars</Text>
                    </Pressable>
                    <Pressable style={styles.homeStyles.category4} onPress={() => navigation.navigate('Transportation')}>
                        <Icon
                            type="font-awesome"
                            color='#e5efc1'
                            name="bus"
                            size={25}
                        />
                        <Text style={styles.homeStyles.buttonTitle}>Transportation</Text>
                    </Pressable>
                    {/* <Pressable style={styles.homeStyles.category1} onPress={() => navigation.navigate('Free')}>
                        <Icon
                            type="font-awesome"
                            color='#e5efc1'
                            name="home"
                            size={25}
                        />
                        <Text style={styles.homeStyles.buttonTitle}>Free</Text>
                    </Pressable> */}
                    <Divider style={{ height: 1, backgroundColor: 'black', marginTop: 5 }} />
                    <Text h4 style={{ marginTop: 10, marginBottom: 10, color: '#138181' }}>Check your expenses for the current month here:</Text>
                    <Pressable style={styles.homeStyles.buttonStyle} onPress={() => navigation.navigate('Total Expenses')}>
                        <Icon
                            type="ionicon"
                            color='#e5efc1'
                            name="pie-chart-outline"
                            size={25}
                        />
                        <Text style={styles.homeStyles.buttonTitle}>Total Expenses</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

