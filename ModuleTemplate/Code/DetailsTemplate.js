const ModulesToBeImported = require("./ModulesToBeImported");
const ComponentGenerator = require("../../SharedUtils/ComponentGenerator");
const SpecialStatesHandler = require("../SpecialStatesHandler");
var _ = require("lodash");

module.exports = {
  getStateName: function (state) {
    if (state.includes('-')) {
      const arr = state.split('-')
      return arr[0]
    }
    else return state
  },
  
  newStatesNames: function (states) {
    var newStates = []
    for (const state of states) {
      const isSpecialState = SpecialStatesHandler.isSpecialState(state)
      if (isSpecialState) {
        if (SpecialStatesHandler.extraStatesRequirements.includes(isSpecialState['type'])) {
          newStates.push(SpecialStatesHandler.extraBooleanStateForDateTimePicker(state))
        }
      }
    }
    return newStates
  },

  statesInConstructor: function (states) {
    var stateInitCode = []
    for (const state of states) {
      const isSpecialState = SpecialStatesHandler.isSpecialState(state)
      if (isSpecialState && SpecialStatesHandler.extraStatesRequirements.includes(isSpecialState['type'])) {
        stateInitCode.push(`${state}: new Date()`)
      }
      else {
        stateInitCode.push(`${this.getStateName(state)}: null`)
      }
    }
    const newStates = this.newStatesNames(states)
    newStates.map(newState => { stateInitCode.push(`${newState}: null`) })

    const code = `
              constructor(props) {
                  super(props)
                  this.state = { 
                      ${stateInitCode.join("\n,")}
                  }    
              }
        `;
    return code;
  },

  lifeCycleMethods: function (states) {
    const code = `
            componentDidMount() {
                axios.get('').then(res => {
                    const data = res.data\n
                    ${states.map((state) => {
                        const filteredState = this.getStateName(state)
                        return `this.setState({ ${filteredState}: data.${filteredState} })`;
                      }).join("\n")}
                })
            }
        `;
    return code;
  },

  statesCorrespondingMethods: function (states) {
    const code = [];
    for (const state of states) {
      if (SpecialStatesHandler.isSpecialState(state) || SpecialStatesHandler.isUserCustomState(state)) continue
      else code.push(`on${_.upperFirst(state)}Changed = (text) => {
                this.setState({ ${state}: text })
            }`);
    }
    return code.join("\n");
  },

  renderComponents: function (states) {
    const code = [];
    for (const state of states) {

      var specialState = SpecialStatesHandler.isSpecialState(state)
      var isUserCustomState = SpecialStatesHandler.isUserCustomState(state)

      if (isUserCustomState) {
        //In this case the state should be like "insurance-picker-primary-secondary-third"
        const userCustomStateComponent = SpecialStatesHandler.handleUserCustomState(state)
        if (userCustomStateComponent === null) {
          code.push(ComponentGenerator.createNativeBaseInput("outline", _.upperFirst(state), state))
        }
        else code.push(userCustomStateComponent)

      }
      else if (specialState) {

        const specialStateComponent = SpecialStatesHandler.handleSpecialState(state, states, specialState['type'], specialState['keyword'])
        if (specialStateComponent === null) {
          code.push(ComponentGenerator.createNativeBaseInput("outline", _.upperFirst(state), state))
        }
        else code.push(specialStateComponent)

      }
      else {
        code.push(ComponentGenerator.createNativeBaseInput("outline", _.upperFirst(state), state));
      }
    }
    code.push(ComponentGenerator.createNativeBaseButton("md", "md", "Submit"));
    return `render() {
            return <NativeBaseProvider>
                    <Center flex={1}>
                        <Stack space={4} w={{base: "90%", md: "25%"}}>
                            ${code.join("\n")}
                        </Stack>
                    </Center>
            </NativeBaseProvider>
    }`;
  },

  build: function (className, states) {
    const code = `
          ${ModulesToBeImported.DetailsTemplateModules.join("\n")}
          export default class ${className} extends React.PureComponent {
              ${this.statesInConstructor(states)}
              ${this.lifeCycleMethods(states)}
              ${this.statesCorrespondingMethods(states)}
              ${this.renderComponents(states)}
          }`;
    return code;
  },
};
