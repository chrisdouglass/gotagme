const setupErrorHandlers = function(app) {
  // Development Error Handler - Prints Stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        error: err.message,
        status: res.status,
        stack: err.stack
      });
    });
  }

  // Production Error Handler - No Stacktrace
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      error: err.message,
      status: res.status
    });
  });
};

module.exports = setupErrorHandlers;
