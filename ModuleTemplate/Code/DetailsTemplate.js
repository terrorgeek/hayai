const ModulesToBeImported = require("./ModulesToBeImported");
const ComponentGenerator = require("../../SharedUtils/ComponentGenerator");
const SpecialStatesHandler = require("../SpecialStatesHandler");
var _ = require("lodash");

module.exports = {
  statesInConstructor: function (states) {
    const code = `
              constructor(props) {
                  super(props)
                  this.state = { 
                      ${states.map((state) => {
                        if (!state.includes('-')) return `${state}: null,`
                      }).join("\n")}
                  }    
              }
        `;
    return code;
  },

  lifeCycleMethods: function (states) {
    const code = `
            componentDidMount() {
                axios.get('').then(res => {
                    ${states
                      .map((state) => {
                        `this.setState({ ${state}: res.${state} })`;
                      })
                      .join("\n")}
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
          code.push(ComponentGenerator.createNativeBaseInput("outline", _.upperFirst(state)))
        }
        else code.push(userCustomStateComponent)
      }
      else if (specialState) {
        const specialStateComponent = SpecialStatesHandler.handleSpecialState(state, states, specialState['type'], specialState['keyword'])
        if (specialStateComponent === null) {
          code.push(ComponentGenerator.createNativeBaseInput("outline", _.upperFirst(state)))
        }
        else code.push(specialStateComponent)
      }
      else {
        code.push(ComponentGenerator.createNativeBaseInput("outline", _.upperFirst(state)));
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
          }
        `;
    return code;
  },
};
