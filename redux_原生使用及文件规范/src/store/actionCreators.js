const {
    CHANGE_NAME,
    CHANGE_AGE
} = require('./constants');


const changeNameAction = function (name) {
    return {
        type: CHANGE_NAME,
        name,
    };
};

const changeAgeAction = function (age) { 
    return {
        type: CHANGE_AGE,
        age,
    }
};

module.exports = {
    changeNameAction,
    changeAgeAction,
}