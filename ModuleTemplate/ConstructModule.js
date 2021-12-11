const vscode = require('vscode');
const fs = require('fs');
const FileFolderUtils = require('../SharedUtils/FileFolderUtils');
const Constants = require('../Constants');

//Code templates
const DetailsTemplate = require('./Code/DetailsTemplate');
const IndexTemplate = require('./Code/IndexTemplate');

module.exports = {
    assemblyLine: function (workspaceRootPath, className, states) {
        //const workspaceRootPath = vscode.workspace.workspaceFolders[0].uri.toString().split(':')[1]
        const srcFolders = FileFolderUtils.getFolders()
        if (srcFolders.includes(className)) {
            vscode.window.showInformationMessage('This module actually was created before, please consider using another name.');
            return
        }

        //Create the folder name first, e.g. Medications
        const moduleFolderName = `${workspaceRootPath}/${Constants.SrcFolderName}/${className}`
        fs.mkdirSync(moduleFolderName)
        const filesNeedToBeCreated = [`${className}Details`, `index`]
        for (const file of filesNeedToBeCreated) {
            var content = '';
            if (file.includes('Details')) {
                content = DetailsTemplate.build(className, states)
            }
            else if (file.includes('index')) {
                content = IndexTemplate.build(className, states)
            }
            FileFolderUtils.writeFile(`${moduleFolderName}`, `${file}.js`, content);
        }
    }
}