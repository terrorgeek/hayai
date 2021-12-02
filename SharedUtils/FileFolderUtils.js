const fs = require('fs');
const vscode = require('vscode');
const Constants = require('../Constants');
const path = require('path');

module.exports = {
    getFolders: function () {
        const workspaceRootPath = vscode.workspace.workspaceFolders[0].uri.toString().split(':')[1]
        const srcPath = `${workspaceRootPath}/${Constants.SrcFolderName}`
        if (!fs.existsSync(srcPath)) 
            fs.mkdirSync(srcPath)

        var folders = []
        fs.readdirSync(srcPath).forEach(function (item) {
            console.log(item)
            folders.push(item)
        })
        return folders
    },
    writeFile: function (folderPath, newFileName, content) {
        fs.writeFile(path.join(folderPath, newFileName), content, (err) => {
			if (err) {
				return vscode.window.showErrorMessage('Failed to create boilerplate file!');
			}
			vscode.window.showInformationMessage('Created boilerplate files');
		});
    },
    createPackageDotJSONFile: function (folderPath, newFileName, name) {
        //name is like "@utils" or so
        const content = `{
                             "name": "${name}"
                         }`
        this.writeFile(folderPath, newFileName, content)
    }
}