const InitTools = {
  NotImplemented: function(req, res, next) {
    const err = new Error('Not Implemented');
    err.status = 501;
    next(err);
  },
};

// TODO: Turn this into a proper module.
module.exports = InitTools;
