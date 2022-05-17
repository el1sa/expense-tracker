import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './components/HomeScreen';
import GroceryScreen from './components/GroceryScreen';
import HealthBeautyScreen from './components/HealthBeautyScreen';
import RestaurantBarScreen from './components/RestaurantBarScreen';
import TransportationScreen from './components/TransportationScreen';
import FreeScreen from './components/FreeScreen';
import TotalScreen from './components/TotalScreen';
import * as React from "react";
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {

  function LogoTitle() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          height: 60
        }}
      >
        <Text
          style={{ color: '#e5efc1', fontSize: 25, fontWeight: 'bold' }}>
          Expense Tracker
        </Text>
      </View>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerStyle: { backgroundColor: '#39aea9' },
            headerTitleStyle: { fontSize: 25, color: '#e5efc1' },
          }} />
        <Stack.Screen name='Groceries' component={GroceryScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerStyle: { backgroundColor: '#39aea9' },
            headerTitleStyle: { fontSize: 25, color: '#411747' },
          }} />
        <Stack.Screen name='Health and Beauty' component={HealthBeautyScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerStyle: { backgroundColor: '#39aea9' },
            headerTitleStyle: { fontSize: 25, color: '#411747' },
          }} />
        <Stack.Screen name='Restaurants and Bars' component={RestaurantBarScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerStyle: { backgroundColor: '#39aea9' },
            headerTitleStyle: { fontSize: 25, color: '#411747' },
          }} />
        <Stack.Screen name='Transportation' component={TransportationScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerStyle: { backgroundColor: '#39aea9' },
            headerTitleStyle: { fontSize: 25, color: '#411747' },
          }} />
        <Stack.Screen name='Free' component={FreeScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerStyle: { backgroundColor: '#39aea9' },
            headerTitleStyle: { fontSize: 25, color: '#411747' },
          }} />
        <Stack.Screen name='Total Expenses' component={TotalScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerStyle: { backgroundColor: '#39aea9' },
            headerTitleStyle: { fontSize: 25, color: '#411747' },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


