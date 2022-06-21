const { Service } = require('feathers-mongodb');

exports.Corbeille = class Corbeille extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('corbeille');
    });
  }
};
