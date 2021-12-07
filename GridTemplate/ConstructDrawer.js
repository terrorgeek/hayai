module.exports = {
    initGridAndStack: function () {
        return `const StackNavigator = createNativeStackNavigator();\n`
    },

    constructGrid: function (moduleNames) {
        const components = moduleNames.map(module => {
            return `<Center h="100px" w="100px" bg="primary.500" 
              rounded="md" shadow={3} px='1'>
              ${module}
            </Center>`
        }).join('\n')

        return `
            function GridComponents() {
                return <Center flex={1}>
                    <Stack space={4} w={{ base: "90%", md: "25%" }}>
                        <ScrollView
                            _contentContainerStyle={{ px: "20px", mb: "4", minW: "72" }}
                        >
                            <Stack space={3} alignItems="center">
                                <HStack space={3} alignItems="center">
                                    ${components}
                                </HStack>
                            </Stack>
                        </ScrollView>
                    </Stack>
                </Center>
            }`
    },

    constructStack: function (moduleNames) {
        var components = moduleNames.map(name => {
            return `<StackNavigator.Screen name="${name}Index" component={${name}Index} />`
        });
        components.unshift(`<StackNavigator.Screen name="GridIndex" component={GridComponents} />`)
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