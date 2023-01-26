module.exports = app => {

  // Base URLS
  app.use('/', require('./base.routes.js'))
  app.use('/', require('./auth.routes.js'))
  app.use('/coasters', require('./coasters.routes.js'))
  app.use('/parks', require('./parks.routes.js'))
}