const ModulesToBeImported = require('./ModulesToBeImported')
const ConstructTab = require('./ConstructTab')

const FileFolderUtils = require('../SharedUtils/FileFolderUtils')

module.exports = {
    assemblyLine: function () {
        const modules = FileFolderUtils.getFolders()

        const code = `
          ${ModulesToBeImported.basicModules.join('\n')}
          ${ModulesToBeImported.srcModules()}
          ${ConstructTab.initTabAndStack(modules)}
          ${ConstructTab.constructTab(modules)}
          ${ConstructTab.constructStack(modules)}
        `
        return code
    }
}