const debug = require("debug")("voting:asyncHandler");
module.exports = function(handler) {
  return async (req, res, next) => {
      try {
          handler(req, res);
      }
      catch(ex) {
          debug("AsyncHandler: " + ex.message);
          next(ex);
      }
  }
}