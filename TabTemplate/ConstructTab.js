module.exports = {
    initTabAndStack: function () {
        return `const Tab = createBottomTabNavigator();\n
                const Stack = createNativeStackNavigator();\n`
    },

    constructTab: function(moduleNames) {
        const components = moduleNames.map(name => {
            return `<Tab.Screen 
              name="${name}Tab" 
              options={{
                  title: "${name}",
                  headerRight: () => (
                        <Button
                            onPress={() => navigation.navigate('${name}Details')}
                            title="Add"
                        />
                    )
                }} 
              component={${name}Index} 
            />`
        });
        const initialModule = `${moduleNames[0]}Drawer`;

        return `
            function TabsComponents({ navigation }) {
                return (
                    <Tab.Navigator initialRouteName="${initialModule}">
                       ${components.join('\n')}
                    </Tab.Navigator>
                )
            }`;
    },

    constructStack: function (moduleNames) {
        const components = moduleNames.map(name => {
            return `<Stack.Screen name="${name}Details" component={${name}Details} />`
        });
        return `export default function StackComponents() {
            return (
                <NavigationContainer>
                    <Stack.Navigator >
                        <Stack.Screen name="Home" component={TabsComponents} options={{ headerShown: false }} />
                        ${components.join('\n')}
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }`
    }
}