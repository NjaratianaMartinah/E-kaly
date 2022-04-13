const response = require('../helpers/response.helper');
const orderService = require('../services/order.services');

const orderController = (url, router) => {
  router.post(`${url}`, (req,res) => {
    const order = req.body;
    console.log(order);
    orderService.saveOrder(order).then( ()=> response.success(res, null, "Order inserted with success"));
  });

  router.get(`${url}`, (req, res) => {
    orderService.getAllOrders().then( (orders) => response.success(res, orders, "Orders selected"))
  });

  router.get(`${url}/restaurant/:restoId`, (req, res) => {
    const param = req.params;
    orderService.findOrderOfRestaurant(param.restoId).then( (orders) => response.success(res, orders, "Orders selected"))
  });

  router.post(`${url}/deliverer`, (req, res) => {
    const param = req.body;
    orderService.setDeliverer(param.orderId, param.deliverer).then(
      (order) => response.success(res, order, "order attributed to the deliverer with success")
    )
  });
  
  router.post(`${url}/status`, (req, res) => {
    console.log(req.body);
    orderService.updateStatusOrder( req.body.orderId, req.body.status ).then(
      (order) => response.success(res, order, "change the status of the order")
    )
  });

  router.get(`${url}/deliverer/:delivererId`, (req, res) => {
    const param = req.params;
    orderService.getOrderByDeliverer(param.delivererId).then( (orders) => response.success(res, orders, "Orders selected"))
  });
}

module.exports = orderController;

