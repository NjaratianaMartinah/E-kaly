const profilService = require('./profil.services');
const fileHelper = require('../helpers/file.helper');

async function insertRestaurant(restaurant, files){
  console.log(process.env.RESTO_IMG);
  restaurant.type = "restaurant";
  restaurant.status = true; 
  console.log(restaurant);
  var fileData = fileHelper.uploadFile(files, process.env.RESTO_IMG);
  console.log(fileData);
  restaurant.avatar = fileData.data.path;
  console.log(restaurant);
  return profilService.register(restaurant);
}

async function findRestaurants(){
  return profilService.findAllByType("restaurant");
}

async function addPlates(restaurant, files){
  profilService.getById(restaurant.id).then( resto => {
    fileHelper.uploadFile(files, process.env.PLAT_IMG);
    console.log(resto);
    resto.plats.push(restaurant.plat);
    profilService.updateProfil(resto);
  });
}

async function deleteRestaurant(restaurant){
  console.log(restaurant);
  profilService.getById(restaurant.id).then( resto => {
    resto.status = false;
    console.log(resto);
    profilService.updateProfil(resto);
  });
}


module.exports = {
  findRestaurants,
  addPlates,
  insertRestaurant,
  deleteRestaurant
}


