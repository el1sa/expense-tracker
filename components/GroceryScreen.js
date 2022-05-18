import React, { useState, useEffect } from 'react';
import { View, FlatList, Pressable, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, ListItem, Icon } from 'react-native-elements';
import * as Styles from "./styles"
import DateTimePicker from '@react-native-community/datetimepicker';

const db = SQLite.openDatabase('productdb.db');

export default function GroceryScreen({ route, navigation }) {
    const styles = Styles.styles;

    const [amount, setAmount] = useState('');
    const [title, setTitle] = useState('');
    const [items, setItems] = useState([]);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [entrydate, setEntryDate] = useState('');

    const groceryTotal = items.map(item => item.amounts).reduce((prevTotal, value) => prevTotal + value, 0).toFixed(2)

    // numeron tarkistus
    const isNumber = (val) => {
        return /^[0-9.]+$/.test(val);
    }

    // pvm tarkistus
    function dateIsValid(dateStr) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        if (dateStr.match(regex) === null) {
            return false;
        }

        const date = new Date(dateStr);

        const timestamp = date.getTime();

        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
            return false;
        }

        return date.toISOString().startsWith(dateStr);
    }

    const checkTextInput = () => {
        //Check for the Title TextInput
        if (!title.trim()) {
            alert('Please enter vendor');
            return;
        }
        //Check for the Amount TextInput not empty
        if (!amount.trim()) {
            alert('Please enter correct amount (00.00)');
            return;
        }
        // Check that amount contains only numbers
        if (isNumber(amount) === false) {
            alert('Please enter correct amount (00.00)');
            return;
        }
        // check date input not empty
        if (!entrydate.trim()) {
            alert('Please enter correct date (yyyy-mm-dd)');
            return;
        }
        // check date is in correct format
        if (dateIsValid(entrydate) === false) {
            alert('Please enter correct date (yyyy-mm-dd)');
            return;
        }
        // input tarkastus ok, tallennus tietokantaan
        saveItem();
        alert('Expense saved!');
    };


    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists grocery (id integer primary key not null, amounts int, title text, entrydate text);');
        }, null, updateList);
    }, []);

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into grocery (amounts, title, entrydate) values (?, ?, ?);', [parseFloat(amount).toFixed(2), title, entrydate]);
        }, null, updateList
        )
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from grocery;', [], (_, { rows }) =>
                setItems(rows._array),
                setAmount(''),
                setTitle(''),
                setEntryDate('')

            );
        }, null, null
        );
    }

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql(`delete from grocery where id = ?;`, [id]);
        }, null, updateList
        )
    }

    // pvm luominen
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '-' + ('0' + (tempDate.getMonth() + 1)).slice(-2) + '-' + ('0' + tempDate.getDate()).slice(-2);

        setEntryDate(fDate);

        console.log(entrydate);

    }

    // datepickerin näyttö
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const renderItem = ({ item }) => (
        <ListItem bottomDivider>
            <ListItem.Content style={styles.categoryStyles.listContent}>
                <View>
                    <ListItem.Title style={styles.categoryStyles.title}>{item.title}</ListItem.Title>
                    <ListItem.Subtitle style={styles.categoryStyles.subtitle}>{item.amounts.toFixed(2)}€</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.categoryStyles.subtitle}>{item.entrydate}</ListItem.Subtitle>
                </View>
                <Icon type="material" color="#39aea9" name="delete" size={33} onPress={() => deleteItem(item.id)} />
            </ListItem.Content>
        </ListItem>
    )
    console.log(items);

    return (
        <View style={styles.categoryStyles.container}>
            <View>
                <View style={styles.categoryStyles.inputView}>
                    <Input placeholder='Store name'
                        style={styles.categoryStyles.input}
                        onChangeText={(title) => setTitle(title)}
                        value={title} />
                    <Input placeholder='Costs (€)'
                        keyboardType='numeric'
                        style={styles.categoryStyles.input}
                        onChangeText={(amount) => setAmount(amount)}
                        value={amount} />

                    <View style={{ flexDirection: 'row' }}>
                        <Pressable style={{
                            backgroundColor: '#39aea9', height: 40, marginLeft: 10, width: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 5
                        }} onPress={() => showMode('date')}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#e5efc1' }}>Select Date Here</Text>
                        </Pressable>

                        <Input placeholder='yyyy-mm-dd'
                            style={styles.categoryStyles.input}
                            onChangeText={(entrydate) => setEntryDate(entrydate)}
                            value={entrydate} />



                        {show && (
                            <DateTimePicker
                                testID='dateTimePicker'
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display='default'
                                onChange={onChange}
                            />
                        )}
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Pressable style={styles.homeStyles.buttonStyle} onPress={checkTextInput}>
                            <Icon
                                type="font-awesome"
                                color='#e5efc1'
                                name="save"
                                size={25}
                            />
                            <Text style={styles.homeStyles.buttonTitle}>SAVE</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <FlatList
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />

            {/* <View style={{ alignItems: 'center' }}>
                <Text style={styles.categoryStyles.total}>Total: {groceryTotal}€ </Text>
                <View style={{ alignItems: 'center' }}>
                    <Button onPress={() => navigation.navigate('Total Expenses')}
                        buttonStyle={styles.categoryStyles.totalButton} title="See your total expenses here!" />
                </View>
            </View> */}
        </View>

    );

}