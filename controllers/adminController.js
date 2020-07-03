const db = require('../models')
const Restaurant = db.Restaurant

let adminController = {
  getRestaurants: (req, res) => {
    return Restaurant.findAll({ raw: true }).then(restaurants => {
      return res.render('admin/restaurants',{ restaurants: restaurants })
    })
  },

  createRestaurant: (req, res) => {
    return res.render('admin/create')
  },

  postRestaurant: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', "Name didn't exits")
      return res.redirect('back')
    }
    return Restaurant.create({
      name: req.body.name,
      tel: req.body.tel,
      address: req.body.address,
      opening_hour: req.body.opening_hour,
      description: req.body.description
    })
    .then((restaurant) => {
      req.flash('success_messages', "Restaurant was successfully created.")
      res.redirect('/admin/restaurants')
    })
  }
}

module.exports = adminController