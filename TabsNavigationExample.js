import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MedicationIndex from './src/Medications/index'
import MedicationDetails from './src/Medications/MedicationDetails'
import ImmunizationIndex from './src/Immunizations/index'
import ImmunizationDetails from './src/Immunizations/ImmunizationDetails'
import Another from './src/Medications/Another'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabComponents() {
  return (
        <Tab.Navigator>
          <Tab.Screen name="MedicationIndex" component={MedicationIndex} />
          <Tab.Screen name="ImmunizationIndex" component={ImmunizationIndex} />
        </Tab.Navigator>
  )
}

export default function App() {
    return (
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen name="Home" component={TabComponents} options={{ headerShown: false }} />
            <Stack.Screen name="MedicationDetails" component={MedicationDetails}  />
            <Stack.Screen name="ImmunizationDetails" component={ImmunizationDetails} />
            <Stack.Screen name="Another" component={Another} />
          </Stack.Navigator>
        </NavigationContainer>
    );
}

