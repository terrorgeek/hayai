const ModulesToBeImported = require('./ModulesToBeImported')
const ConstructDrawer = require('./ConstructDrawer')
const FileFolderUtils = require('../SharedUtils/FileFolderUtils')

module.exports = {
    assemblyLine: function () {
        const modules = FileFolderUtils.getFolders()
        const code = `
          ${ModulesToBeImported.basicModules.join('\n')}
          ${ModulesToBeImported.srcModules()}
          ${ConstructDrawer.initGridAndStack(modules)}
          ${ConstructDrawer.constructGrid(modules)}
          ${ConstructDrawer.constructStack(modules)}
        `
        return code
    }
}