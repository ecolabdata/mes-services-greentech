const app = require('../../src/app');

describe('\'corbeille\' service', () => {
  it('registered the service', () => {
    const service = app.service('corbeille');
    expect(service).toBeTruthy();
  });
});
