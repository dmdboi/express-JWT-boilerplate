const jwt = require("jsonwebtoken");

exports.success = function() {
  return jwt.sign(
    {
      username: user[0].username,
      userID: user[0]._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );
};
