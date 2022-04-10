const profilService = require('./profil.services');

async function findDeliverer(){
  return profilService.findAllByType("deliverer");
}

module.exports = {
  findDeliverer
}




