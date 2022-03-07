/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/core/app';
import {buscaTodosDados, atualizandoToken} from './src/core/synchronize';
import Database from './src/core/database';

AppRegistry.registerComponent(appName, () => {
    //Database.dropDatabase();
    Database.initDB();
    buscaTodosDados();
    // atualizandoToken(9);
    return App
});
