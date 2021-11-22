const ModulesToBeImported = require("./ModulesToBeImported");
const _ = require('underscore');

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
                    ${states.map(state => {
                        `this.setState({ ${state}: res.${state} })`
                    }).join('\n')}
                })
            }
        `
        return code
    },

    statesCorrespondingMethods: function (states) {
        const code = [];
        for (const state in states) {
            code.push(`on${_.capitalize(state)}Changed = (text) => {
                this.setState({ ${state}: text })
            }`)
        }
        return code.join('\n')
     },

  build: function (className, states) {
    const code = `
          ${ModulesToBeImported.DetailsTemplateModules.join("\n")}

          export default class ${className} extends React.PureComponent {
              ${this.statesInConstructor(states)}
              ${this.lifeCycleMethods(states)}
              ${this.statesCorrespondingMethods(states)}
          }
        `;
    return code;
  },
  
};
