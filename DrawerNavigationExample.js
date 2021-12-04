import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MedicationIndex from './src/Medications/index'
import MedicationDetails from './src/Medications/MedicationDetails'
import ImmunizationIndex from './src/Immunizations/index'
import ImmunizationDetails from './src/Immunizations/ImmunizationDetails'

import Another from './src/Medications/Another'

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// function MedicationStackComponents() {
//   return (
//       <Stack.Navigator >
//         {/* <Stack.Screen name="Drawer" component={DrawerComponents} /> */}
//         <Stack.Screen name="MedicationIndex" component={MedicationIndex} />
//         <Stack.Screen name="MedicationDetails" component={MedicationDetails} />
//     </Stack.Navigator>
//   )
// }

// function ImmunizationStackComponents() {
//   return (
//       <Stack.Navigator>
//         {/* <Stack.Screen name="Drawer" component={DrawerComponents} /> */}
//         <Stack.Screen name="ImmunizationIndex" component={ImmunizationIndex} />
//         <Stack.Screen name="ImmunizationDetails" component={ImmunizationDetails} />
//     </Stack.Navigator>
//   )
// }

// export default function DrawerComponents() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="MedicationIndex">
//           <Drawer.Screen name="MedicationDrawer" component={MedicationStackComponents} />
//           <Drawer.Screen name="ImmunizationDrawer" component={ImmunizationStackComponents} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

function DrawerComponents() {
  return (
    <Drawer.Navigator initialRouteName="MedicationDrawer">
      <Drawer.Screen name="MedicationDrawer" component={MedicationIndex}  />
      <Drawer.Screen name="ImmunizationDrawer" component={ImmunizationIndex} />
    </Drawer.Navigator>
  )
}

export default function StackComponents() {
  return (
    <NavigationContainer>
       <Stack.Navigator >
         <Stack.Screen name="Home" component={DrawerComponents} options={{ headerShown: false }} />
         <Stack.Screen name="MedicationDetails" component={MedicationDetails}  />
         <Stack.Screen name="ImmunizationDetails" component={ImmunizationDetails} />
         <Stack.Screen name="Another" component={Another} />
       </Stack.Navigator>
    </NavigationContainer>
  );
}