const restaurantService = require('../services/restaurant.services');
const response = require('../helpers/response.helper');

const restaurantController = ( url ,router ) => {
  router.get(url, (req, res) => {
    restaurantService.findRestaurants().then(
      (restaurants) => response.success(res, restaurants, "Restaurants selected")
      );
  })

  router.post(`${url}/addPlat`, (req, res) => {
    var restaurant = req.body;
    console.log(restaurant);
    console.log(req.files);
    var files = req.files;
    restaurant.plat = JSON.parse(restaurant.plat);
    restaurantService.addPlates(restaurant, files).then( (restaurant) => response.success(res, restaurant, "Add plat success")  );
  })

  router.post(url, (req, res) => {
    var data = req.body;
    console.log(data);
    var restaurant = JSON.parse( data.restaurant );
    console.log(req.files);
    var files = req.files;
    restaurantService.insertRestaurant(restaurant, files).then(
      (restaurant) => response.success(res, null, "Restaurant added with success")
    );
  })

  router.post(`${url}/delete`, (req, res)=> {
    var resto = req.body;
    console.log(resto);
    restaurantService.deleteRestaurant(resto).then(
      (resto) => response.success(res, null, "Restaurant deleted ")
    );
  });

}


module.exports = restaurantController;