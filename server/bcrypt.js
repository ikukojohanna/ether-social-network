const bcrypt = require("bcryptjs");

// this fn you use when user registers
exports.hash = (password) => {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
};

//this fn you use when logs in
exports.compare = bcrypt.compare;
