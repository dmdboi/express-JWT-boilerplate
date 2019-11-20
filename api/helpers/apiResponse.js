//Thanks to https://github.com/maitraysuthar/rest-api-nodejs-mongodb

exports.success = function(res, msg) {
  var data = {
    status: 1,
    message: msg
  };
  return res.status(200).json(data);
};

exports.successWithData = function(res, msg, data) {
  var data = {
    status: 1,
    message: msg,
    data: data
  };
  return res.status(200).json(data);
};

exports.error = function(res, msg) {
  var data = {
    status: 0,
    message: msg
  };
  return res.status(500).json(data);
};

exports.notFound = function(res, msg) {
  var data = {
    status: 0,
    message: msg
  };
  return res.status(404).json(data);
};

exports.validationError = function(res, msg) {
  var data = {
    status: 0,
    message: msg
  };
  return res.status(400).json(data);
};

exports.unauthorizedAccess = function(res, msg) {
  var data = {
    status: 0,
    message: msg
  };
  return res.status(401).json(data);
};
