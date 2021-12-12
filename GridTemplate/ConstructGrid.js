const _ = require('lodash');

module.exports = {
    initGridAndStack: function () {
        return `const StackNavigator = createNativeStackNavigator();\n`
    },

    constructGrid: function (moduleNames) {
        var componentGroups = _.chunk(moduleNames, 3)
        const components = componentGroups.map(group => {
            return `
            <HStack space={3} alignItems="center">
              ${group.map(module => {
                  return `
                        <TouchableOpacity onPress={() => navigation.navigate('${module}Index') }>
                            <Center h="100px" w="100px" bg="primary.500" rounded="md" shadow={3} px='1'>
                                ${module}
                            </Center>
                        </TouchableOpacity>
                        `
               }).join('\n')}
            </HStack>`
        }).join('\n')

        return `
            function GridComponents({ navigation }) {
                return <NativeBaseProvider>
                    <Center flex={1}>
                        <Stack space={4} w={{ base: "90%", md: "25%" }}>
                            <ScrollView _contentContainerStyle={{ px: "20px", mb: "4", minW: "72" }} >
                                <Stack space={3} alignItems="center">
                                    ${components}
                                </Stack>
                            </ScrollView>
                        </Stack>
                    </Center>
                </NativeBaseProvider>
            }`
    },

    constructStack: function (moduleNames) {
        var components = moduleNames.map(name => {
            return `
              <StackNavigator.Screen
                name="${name}Index" 
                component={${name}Index} 
                options={({ navigation }) => ({
                    headerRight: () => (
                        <Button
                            onPress={() => navigation.navigate('${name}Details')}
                            title="Add"
                        />
                    )
                })}
              />
              <StackNavigator.Screen name="${name}Details" component={${name}Details} />
            `
        });
        components.unshift(`
          <StackNavigator.Screen 
            name="Dashboard" 
            component={GridComponents} 
          />
        `)
        return `export default function StackComponents() {
            return (
                <NavigationContainer>
                    <StackNavigator.Navigator>
                        ${components.join('\n')}
                    </StackNavigator.Navigator>
                </NavigationContainer>
            );
        }`
    }
}