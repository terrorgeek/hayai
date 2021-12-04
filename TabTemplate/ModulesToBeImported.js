const FileFolderUtils = require('../SharedUtils/FileFolderUtils')

module.exports = {
    basicModules: [
        `import * as React from 'react';`,
        `import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';`,
        `import { NavigationContainer } from '@react-navigation/native';`,
        `import { createNativeStackNavigator } from '@react-navigation/native-stack';`,
    ],

    //Also get the folder names as module under 'src'
    srcModules: function () {
        const srcFolders = FileFolderUtils.getFolders()
        const modules = []
        for (const folder of srcFolders) {
            const indexImportSyntax = `import ${folder}Index from './src/${folder}/index'`
            const detailsImportSyntax = `import ${folder}Details from './src/${folder}/${folder}Details'`
            modules.push(indexImportSyntax, detailsImportSyntax)
        }
        return modules.join('\n')
    }
}