export default {
    constructDrawerItem: function(componentNames) {
        const components = componentNames.map(name => {
            `<Drawer.Screen name="${name}" component={${name}} />`
        });
        const initialComponent = componentNames[0];

        return `
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="${initialComponent}">
                    ${components}
                </Drawer.Navigator>
            </NavigationContainer>
        `;
    },

    constructComponentForDrawerItem: function(stateNames) {

    }
}