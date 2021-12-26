const DetailsTemplate = require("./DetailsTemplate");
const ModulesToBeImported = require("./ModulesToBeImported");
const faker = require("faker");
const SpecialStatesHandler = require('../SpecialStatesHandler');

module.exports = {
  placeholderSingleRecord: function (states) { 
    const datetimes = SpecialStatesHandler.SpecialKeyWords.date.concat(
      SpecialStatesHandler.SpecialKeyWords.time).concat(
        SpecialStatesHandler.SpecialKeyWords.datetime)
    const otherTypes = {
      'gender': 'Male', 'year': '1990', 'month': '1', 'weekday': 'Sun', 'day': 'Sun', 'states': 'Alabama'
    }
    otherTypesKeys = Object.keys(otherTypes)
    var record = { id: faker.datatype.uuid() };
    console.log("states: ", states)
    for (const state of states) {
      console.log("fuckingName: ", state)
      if (datetimes.some(x => state.toLowerCase().includes(x))) {
        record[state] = faker.datatype.datetime()
      }
      else if (otherTypesKeys.some(x => state.toLowerCase().includes(x))) {
        for (const otherType of otherTypesKeys) {
          if (state.toLowerCase().includes(otherType)) {
            record[state] = otherTypes[otherType]
            break
          }
        }
      }
      else if (state.includes("-")) continue
      else { 
        record[state] = faker.animal.dog()
      }
    }
    return record
  },

  listOfPlaceholderRecords: function (states) { 
    var records = []
    for (var i = 0; i < 10; i++) { 
      records.push(this.placeholderSingleRecord(states))
    }
    return JSON.stringify(records)
  },

  buildCell: function (states) { 
    const filteredStates = this.placeholderSingleRecord(states)
    return Object.keys(filteredStates
    ).map(state => {
      if (state == 'id') return null
      return `<Text>${state}: {item.${state}}</Text>`
    }).join("\n")
  },

  build: function (className, states) {
    const code = `
          ${ModulesToBeImported.IndexTemplateModules.join("\n")}
          
          const placeholderData = ${this.listOfPlaceholderRecords(states)}

          export default class ${className}Index extends React.PureComponent {
              ${DetailsTemplate.statesInConstructor(states)}

              render() {
                return (
                  <NativeBaseProvider>
                    <Center flex={1}>
                      <Stack space={4} w={{ base: "90%", md: "25%" }}>
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                          data={placeholderData}
                          renderItem={({ item }) => (
                            <Box borderBottomWidth="1" _dark={{ borderColor: "gray.600" }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                              <VStack>
                                ${this.buildCell(states)}
                              </VStack>
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