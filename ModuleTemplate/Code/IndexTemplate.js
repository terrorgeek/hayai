const DetailsTemplate = require("./DetailsTemplate");
const ModulesToBeImported = require("./ModulesToBeImported");

module.exports = {
  build: function (className, states) {
    const code = `
          ${ModulesToBeImported.IndexTemplateModules.join("\n")}

          const data = [{
            placeholder: 'placeholder'
          }, {
            placeholder: 'placeholder'
          }]

          export default class ${className}Index extends React.PureComponent {
              ${DetailsTemplate.statesInConstructor(states)}

              render() {
                return (
                  <NativeBaseProvider>
                    <Center flex={1}>
                      <Stack space={4} w={{ base: "90%", md: "25%" }}>
                        <FlatList
                          data={data}
                          renderItem={({ item }) => (
                            <Box borderBottomWidth="1" _dark={{ borderColor: "gray.600" }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                              <Text>{item.placeholder}</Text>
                            </Box>
                          )}
                          keyExtractor={(item) => item.id}
                        />
                      </Stack>
                    </Center>
                  </NativeBaseProvider>
                );
          }
        }`;
    return code;
  }
}