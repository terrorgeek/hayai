const FileFolderUtils = require('../SharedUtils/FileFolderUtils')

module.exports = {
    initDrawerAndStack: function () {
        return `const Drawer = createDrawerNavigator();\n
                const Stack = createNativeStackNavigator();\n`
    },

    constructDrawer: function(moduleNames) {
        const components = moduleNames.map(name => {
            return `<Drawer.Screen name="${name}Drawer" component={${name}Index} />`
        });
        const initialModule = `${moduleNames[0]}Drawer`;

        return `
            function DrawerComponents() {
                return (
                    <Drawer.Navigator initialRouteName="${initialModule}">
                       ${components.join('\n')}
                    </Drawer.Navigator>
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
                        <Stack.Screen name="Home" component={DrawerComponents} options={{ headerShown: false }} />
                        ${components.join('\n')}
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }`
    }
}