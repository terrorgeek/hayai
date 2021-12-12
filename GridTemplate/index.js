const ModulesToBeImported = require('./ModulesToBeImported')
const ConstructGrid = require('./ConstructGrid')
const FileFolderUtils = require('../SharedUtils/FileFolderUtils')

module.exports = {
    assemblyLine: function () {
        const modules = FileFolderUtils.getFolders()
        const code = `
          ${ModulesToBeImported.basicModules.join('\n')}
          ${ModulesToBeImported.srcModules()}
          ${ConstructGrid.initGridAndStack(modules)}
          ${ConstructGrid.constructGrid(modules)}
          ${ConstructGrid.constructStack(modules)}
        `
        return code
    }
}