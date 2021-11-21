const ModulesToBeImported = require("./ModulesToBeImported");

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
  build: function (className, states) {
    const code = `
          ${ModulesToBeImported.DetailsTemplateModules.join("\n")}

          export default class ${className} extends React.PureComponent {
              ${this.statesInConstructor(states)}
          }
        `;
    return code;
  },
};
