const vscode = require('vscode');
const fs = require('fs');
const FileFolderUtils = require('../SharedUtils/FileFolderUtils');
const Constants = require('../Constants');

module.exports = {
    assemblyLine: function (className, states) {
        const workspaceRootPath = vscode.workspace.workspaceFolders[0].uri.toString().split(':')[1]
        const srcFolders = FileFolderUtils.getFolders()
        if (srcFolders.includes(className)) {
            vscode.window.showInformationMessage('This module actually was created before, please consider using another name.');
            return
        }

        //Create the folder name first, e.g. Medications
        const moduleFolderName = `${workspaceRootPath}/${Constants.SrcFolderName}/${className}`
        fs.mkdirSync(moduleFolderName)
        const filesNeedToBeCreated = [`${className}Details`, `index`, `styles`]
        for (const file of filesNeedToBeCreated) {
            FileFolderUtils.writeFile(`${moduleFolderName}`, `${file}.js`, '');
        }
        
    }
}