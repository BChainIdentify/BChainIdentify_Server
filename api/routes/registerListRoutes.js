'use strict';
module.exports = function (app) {
    const registerList = require('../controllers/registerListController');

    // todoList Routes
    app.route('/register')
        .get(registerList.list_all_register)
        .post(registerList.create_a_register);


    app.route('/register/:registerId')
        .get(registerList.read_a_register)
        .put(registerList.update_a_register)
        .delete(registerList.delete_a_register);

};
