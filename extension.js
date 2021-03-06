// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const _ = require('lodash');

//Modules for creating modules
const StatesExtractor = require("./SharedUtils/StatesExtractor");
const Reconstructor = require("./SharedUtils/Reconstructor");
const FileFolderUtils = require("./SharedUtils/FileFolderUtils");
const ConstructModule = require("./ModuleTemplate/ConstructModule");

//Modules for setup the project
const CommandsNeedToRun = require('./ProjectInitializer/CommandsNeedToRun')
const FileFoldersGenerator = require('./ProjectInitializer/FileFoldersGenerator')

//Modules for Drawer
const DrawerBuilder = require('./DrawerTemplate/index')
//Modules for Tab
const TabBuilder = require('./TabTemplate/index')
//Modules for Grid
const GridBuilder = require('./GridTemplate/index')

//Reset the index.js each time the app structure changed
const AppIndexReseter = require('./SharedUtils/AppIndexReseter')

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
    const appIndexCode = AppIndexReseter.resetIndexFileCode('drawer')
    FileFolderUtils.writeFile(workspaceFolders, 'DrawerNavigator.js', code)
    FileFolderUtils.writeFile(workspaceFolders, 'index.js', appIndexCode)
  })

  //Construct the whole project modules as Tabs
  let constructProjectAsTab = vscode.commands.registerCommand("hayai.reconstructAsTab", async function () {
    if (!vscode.workspace) {
      return vscode.window.showErrorMessage("Please open a project folder first");
    }
    const workspaceFolders = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];
    const code = TabBuilder.assemblyLine()
    const appIndexCode = AppIndexReseter.resetIndexFileCode('tab')
    FileFolderUtils.writeFile(workspaceFolders, 'TabNavigator.js', code)
    FileFolderUtils.writeFile(workspaceFolders, 'index.js', appIndexCode)
  })

  //Construct the whole project modules as Grid
  let constructProjectAsGrid = vscode.commands.registerCommand("hayai.reconstructAsGrid", async function () {
    if (!vscode.workspace) {
      return vscode.window.showErrorMessage("Please open a project folder first");
    }
    const workspaceFolders = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];
    const code = GridBuilder.assemblyLine()
    const appIndexCode = AppIndexReseter.resetIndexFileCode('grid')
    FileFolderUtils.writeFile(workspaceFolders, 'GridNavigator.js', code)
    FileFolderUtils.writeFile(workspaceFolders, 'index.js', appIndexCode)
  })
  
  //General reconstruct command
  let generalReconstructCommand = vscode.commands.registerCommand("hayai.reconstructProject", async function () { 
    if (!vscode.workspace) {
      return vscode.window.showErrorMessage("Please open a project folder first");
    }

    const workspaceFolders = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];
    const input = await vscode.window.showInputBox({
      placeHolder: "How you want to reconstruct project?",
      prompt: "How you want to reconstruct project?",
      value: "",
    });

    if (!input || input.trim().length == 0) {
      vscode.window.showErrorMessage("Please input something to make it work :)");
      return;
    }
    const types = ['grid', 'tab', 'drawer']
    const data = await Reconstructor.reconstruct(input)
    //It's already a string, so we dont have to use JSON.parse
    const type = _.lowerCase(data.choices[0].text.trim());

    if (!types.includes(type)) { 
      vscode.window.showErrorMessage("Reconstruction type should be tab or drawer or grid");
      return;
    }

    var code = null;
    if (_.lowerCase(type) == 'grid') code = GridBuilder.assemblyLine()
    else if (_.lowerCase(type) == 'tab') code = TabBuilder.assemblyLine()
    else if (_.lowerCase(type) == 'drawer') code = DrawerBuilder.assemblyLine()
    const appIndexCode = AppIndexReseter.resetIndexFileCode(type)
    FileFolderUtils.writeFile(workspaceFolders, `${_.upperFirst(type)}Navigator.js`, code)
    FileFolderUtils.writeFile(workspaceFolders, 'index.js', appIndexCode)
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
  context.subscriptions.push(constructProjectAsDrawer);
  context.subscriptions.push(constructProjectAsTab);
  context.subscriptions.push(constructProjectAsGrid);
  context.subscriptions.push(generalReconstructCommand);
  context.subscriptions.push(disposable4);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
