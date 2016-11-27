/**
 * Created by jclagoria on 11/27/16.
 */
'use strict';

module.exports.init = iniModels;

function initModels(app) {
    let modelsPath = app.get('root') + '/app/models/';

    ['user', 'contact'].forEach(function (model) {
        require(modelsPath + model);
    });
};