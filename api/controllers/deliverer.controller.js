const delivererService = require('../services/deliverer.services');
const response = require('../helpers/response.helper');

const delivererController = (url, router) => {
  router.get(`${url}`, (req, res) => {
    delivererService.findDeliverer().then( (deliverer) => response.success(res, deliverer, "Deliverer selected"))
  });

}

module.exports = delivererController;

