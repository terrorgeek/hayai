module.exports = {
  resetIndexFileCode: function (appStructure) { 
    const appStructureCodeMapping = {
      'tab': `import App from './TabNavigator';`,
      'drawer': `import App from './DrawerNavigator';`,
      'grid': `import App from './GridNavigator';`
    }

    return `/**
           * @format
           */
          import {AppRegistry} from 'react-native';
          ${appStructureCodeMapping[appStructure]}
          import {name as appName} from './app.json';
          AppRegistry.registerComponent(appName, () => App);
    `
  }
}