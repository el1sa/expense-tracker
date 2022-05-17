import { View, Text, FlatList, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListItem } from 'react-native-elements';
import * as Styles from "./styles";
import { VictoryPie } from 'victory-native';
import { Svg } from 'react-native-svg';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('productdb.db');

export default function TotalScreen({ navigation, route }) {
    const styles = Styles.styles;
    const categories = ['Groceries', 'Health and Beauty', 'Restaurants and Bars', 'Transportation'] // x-akseli
    const totalsVanha = [46, 50, 70, 35]; // dummy data
    const [totals, setTotals] = useState([]);

    useEffect(() => {
        // console.log("Focus");
        //setTotals([]);
        groceriesTotal();
        healthTotal();
        restaurantTotal();
        transportationTotal();
        freeTotal();
    }, []);

    // seuraavat funktiot valitsevat kokonaiskulut jokaisesta kategoriasta kuluvan kuukauden ja vuoden mukaan
    const groceriesTotal = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(amounts) from grocery where strftime("%Y",entrydate) = strftime("%Y",date("now")) and strftime("%m",entrydate) = strftime("%m",date("now"));',
                [], (_, { rows }) =>
                setTotals([...totals, Object.values(rows._array[0])])
            );
        }, null, null
        );
    }

    const healthTotal = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(amounts) from health where strftime("%Y",entrydate) = strftime("%Y",date("now")) and strftime("%m",entrydate) = strftime("%m",date("now"));',
                [], (_, { rows }) =>
                setTotals(prevTotals => [...prevTotals, Object.values(rows._array[0])])
            );
        }, null, null
        );
    }

    const restaurantTotal = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(amounts) from restaurant where strftime("%Y",entrydate) = strftime("%Y",date("now")) and strftime("%m",entrydate) = strftime("%m",date("now"));',
                [], (_, { rows }) =>
                setTotals(prevTotals => [...prevTotals, Object.values(rows._array[0])])
            );
        }, null, null
        );
    }

    const transportationTotal = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(amounts) from transportation where strftime("%Y",entrydate) = strftime("%Y",date("now")) and strftime("%m",entrydate) = strftime("%m",date("now"));',
                [], (_, { rows }) =>
                setTotals(prevTotals => [...prevTotals, Object.values(rows._array[0])])
            );
        }, null, null
        );
    }

    const freeTotal = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(amounts) from free where strftime("%Y",entrydate) = strftime("%Y",date("now")) and strftime("%m",entrydate) = strftime("%m",date("now"));',
                [], (_, { rows }) =>
                setTotals(prevTotals => [...prevTotals, Object.values(rows._array[0])])
            );
        }, null, null
        );
    }

    // totals on nyt array, jonka sisällä yksittäinen total on oma array
    // luodaan totalsista hetkellisesti string jono
    const totalsJoin = totals.join(", ")

    // luodaan totalsista array, jossa luvut vielä string muodossa
    const totalsArrayStr = totalsJoin.split(", ")

    // muunnetaan arrayn sisältämät string muodot arvoiksi
    const totalsArray = totalsArrayStr.map(str => {
        return Number(str);
    });
    console.log(totalsArray);
    console.log(categories)

    // yhdistetään kategoriat ja niiden kokonaiskustannukset yhdeksi arrayksi
    const mapArrays = (categories, totalsArray) => {
        const chartData = [];
        for (let i = 0; i < categories.length; i++) {
            chartData.push({
                x: categories[i],
                y: totalsArray[i]
            });
        };
        return chartData;
    };

    // muuttuja, jossa luotu array
    let data = mapArrays(categories, totalsArray);

    // filteröidään tyhjät kategoriat pois
    let filterChartData = data.filter(a => a.y > 0)


    // kokonaiskustannusten yhteenlaskettu summa
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)
    console.log('total:' + totalExpense);

    // kokonaiskustannusten prosentuaalinen osuus koko summasta
    let finalChartData = filterChartData.map((item, index) => {
        let percentage = (item.y / totalExpense * 100).toFixed(0)
        return {
            label: `${percentage}%`,
            y: Number(item.y),
            name: item.x,

        }
    })


    // kuluva kuukausi ja vuosi
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    const year = d.getFullYear();
    let nameOfMonth = month[d.getMonth()];

    const renderItem = ({ item, index }) => (
        <ListItem bottomDivider>
            <ListItem.Content style={styles.categoryStyles.totalListContent}>
                <View>
                    <ListItem.Title style={styles.categoryStyles.title}>{item.name}</ListItem.Title>
                    <ListItem.Subtitle style={styles.categoryStyles.subtitle}>{item.y.toFixed(2)}€</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.categoryStyles.subtitle}>{item.label} of total expenses</ListItem.Subtitle>
                </View>
            </ListItem.Content>
        </ListItem >
    )


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Svg style={{ position: 'absolute', width: '100%', height: '110%' }}>

                <VictoryPie
                    data={finalChartData}
                    labels={(datum) => `${datum.y}`}
                    innerRadius={70}
                    labelRadius={({ innerRadius }) => innerRadius + 20}
                    style={{
                        labels: { fontSize: 18, fontWeight: 'bold', fill: 'white' }
                    }}
                    colorScale={["#c27ba0", "#8e7cc3", "#f6b26b", "#83bde5"]}
                // events={[{
                //     target: "data",
                //     eventHandlers: {
                //         onClick: () => {
                //             return [
                //                 {
                //                     target: "data",
                //                     mutation: ({ style }) => {
                //                         return style.fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                //                     }
                //                 }, {
                //                     target: "labels",
                //                     mutation: ({ text }) => {
                //                         return text === "clicked" ? null : { text: "clicked" };
                //                     }
                //                 }
                //             ];
                //         }
                //     }
                // }]}
                />
                <View style={{ position: 'absolute', top: '45%', left: "39%" }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gray' }}>{nameOfMonth} {year}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gray', justifyContent: 'center' }}>Total: {totalExpense}€</Text>
                </View>
            </Svg>
            <SafeAreaView style={{ width: '100%', marginTop: '85%' }}>
                <FlatList
                    data={finalChartData}
                    keyExtractor={(item, index) => index}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </SafeAreaView>
        </View>
    );

}
