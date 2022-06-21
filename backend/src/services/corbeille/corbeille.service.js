// Initializes the `corbeille` service on path `/corbeille`
const { Corbeille } = require('./corbeille.class');
const hooks = require('./corbeille.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/corbeille', new Corbeille(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('corbeille');

  service.hooks(hooks);
};
