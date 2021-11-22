const ModulesToBeImported = require("./ModulesToBeImported");
const ComponentGenerator = require("../../SharedUtils/ComponentGenerator");
var _ = require("lodash");

module.exports = {
  statesInConstructor: function (states) {
    const code = `
              constructor(props) {
                  super(props)
                  this.state = { 
                      ${states.map((state) => `${state}: null,`).join("\n")}
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
      code.push(`on${_.upperFirst(state)}Changed = (text) => {
                this.setState({ ${state}: text })
            }`);
    }
    return code.join("\n");
  },

  renderComponents: function (states) {
    const code = [];
    for (const state of states) {
      code.push(ComponentGenerator.createNativeBaseInput("outline", _.upperFirst(state)));
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
    }
        `;
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
