// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

//Modules for creating modules
const StatesExtractor = require("./SharedUtils/StatesExtractor");
const FileFolderUtils = require("./SharedUtils/FileFolderUtils");
const ConstructModule = require("./ModuleTemplate/ConstructModule");

//Modules for setup the project
const CommandsNeedToRun = require('./ProjectInitializer/CommandsNeedToRun')
const FileFoldersGenerator = require('./ProjectInitializer/FileFoldersGenerator')

//Modules for Drawer
const DrawerBuilder = require('./DrawerTemplate/index')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "hayai" is now active!');
  //1, insert a code snipt by string and create a file for it.
  let disposable = vscode.commands.registerCommand("hayai.createBoilerplate", async function () {
      // The code you place here will be executed every time your command is executed
      if (!vscode.workspace) {
        return vscode.window.showErrorMessage("Please open a project folder first");
      }

      const folderPath = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];
      const htmlContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
        <link rel="stylesheet" href="app.css" />
        </head>
        <body>
        <script src="app.js"></script>
        </body>
        </html>`;

      fs.writeFile(path.join(folderPath, "index.html"), htmlContent, (err) => {
        if (err) {
          return vscode.window.showErrorMessage("Failed to create boilerplate file!");
        }
        vscode.window.showInformationMessage("Created boilerplate files");
      });
    }
  );

  //2, insert a code snipt in an active editor tab for whereever your cursor is
  let disposable2 = vscode.commands.registerCommand("hayai.insertBubbleSort", async function () {
      if (!vscode.workspace) {
        return vscode.window.showErrorMessage("Please open a project folder first");
      }

      const activeEditor = vscode.window.activeTextEditor;
      if (activeEditor) {
        let document = activeEditor.document;
        // Get the document text
        const documentText = document.getText();
        activeEditor.edit((selectedText) => {
          selectedText.replace(
            activeEditor.selection,
            "This is my fucking bubble sort!"
          );
        });
      }
    }
  );

  //Create all needed folders and files, this is generally done for the 1st step
  let createSetUpFolderAndFilesDisposable = vscode.commands.registerCommand("hayai.createSetUpFolderAndFiles", async function () {
    const workspaceFolders = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];
    const terminal = vscode.window.createTerminal(`hayai`);
    FileFoldersGenerator.createConstantsFile(workspaceFolders)
    for (const command of CommandsNeedToRun.yarnCommands) {
      terminal.sendText(command)
    }
    for (const command of CommandsNeedToRun.podCommands) {
      terminal.sendText(command)
    }
    terminal.show()
  });

  //Open a dialog and input whatever you want, and insert a code snipt by importing a node module
  let createModuleCommandDisposable = vscode.commands.registerCommand("hayai.createModule", async function () {
    if (!vscode.workspace) {
      return vscode.window.showErrorMessage("Please open a project folder first");
    }

    const workspaceFolders = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];
    const input = await vscode.window.showInputBox({
      placeHolder: "Put the class name and its states here...",
      prompt: "Put the class name and its states here...",
      value: "",
    });

    if (!input || input.trim().length == 0) {
      vscode.window.showErrorMessage("Please input something to make it work :)");
      return;
    }
    const data = await StatesExtractor.extractStates(input);
    const json = JSON.parse(data.choices[0].text.trim());
    console.log(`DEBUG: ${json}`);
    const className = json.className;
    const states = json.states;
    ConstructModule.assemblyLine(workspaceFolders, className, states);
  }
  );

  //Construct the whole project modules as Drawer
  let constructProjectAsDrawer = vscode.commands.registerCommand("hayai.reconstructAsDrawer", async function () {
    if (!vscode.workspace) {
      return vscode.window.showErrorMessage("Please open a project folder first");
    }
    const workspaceFolders = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];
    const code = DrawerBuilder.assemblyLine()
    FileFolderUtils.writeFile(workspaceFolders, 'DrawerNavigator.js', code)
  })

  let disposable4 = vscode.commands.registerCommand("hayai.test", async function () {
      FileFolderUtils.getFolders();
      const terminal = vscode.window.createTerminal(`yusong`);
	    terminal.sendText("ls");
	    terminal.sendText("date");
      terminal.show();
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
  context.subscriptions.push(createSetUpFolderAndFilesDisposable);
  context.subscriptions.push(createModuleCommandDisposable);
  context.subscriptions.push(disposable4);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
