const CodeForConstants = require('../SharedUtils/Constants')
const ProjectConstants = require('../Constants')
const FileFolderUtils = require('../SharedUtils/FileFolderUtils');
const fs = require('fs')

module.exports = {
  createConstantsFile: function (workspaceRootPath) {
    const workspaceSrcPath = `${workspaceRootPath}/${ProjectConstants.SrcFolderName}`
    const content = CodeForConstants.code.toString()
    if (!fs.existsSync(workspaceSrcPath)) 
      fs.mkdirSync(workspaceSrcPath)
    FileFolderUtils.writeFile(workspaceSrcPath, `Constants.js`, content)
  }
}