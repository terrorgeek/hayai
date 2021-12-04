const ModulesToBeImported = require('./ModulesToBeImported')
const ConstructDrawer = require('./ConstructDrawer')

const FileFolderUtils = require('../SharedUtils/FileFolderUtils')

module.exports = {
    assemblyLine: function () {
        const modules = FileFolderUtils.getFolders()

        const code = `
          ${ModulesToBeImported.basicModules.join('\n')}
          ${ModulesToBeImported.srcModules()}
          ${ConstructDrawer.initDrawerAndStack(modules)}
          ${ConstructDrawer.constructDrawer(modules)}
          ${ConstructDrawer.constructStack(modules)}
        `
        return code
    }
}