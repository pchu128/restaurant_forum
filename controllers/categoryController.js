const db = require('../models')
const categoryService = require('../services/categoryService')
const Category = db.Category

let categoryConroller = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => {
      return res.render('admin/categories', data)
    }).catch(e => console.error(e))
  },

  postCategory: (req, res) => {
    categoryService.postCategory(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      } else {
        req.flash('success_messages', data['message'])
        return res.redirect('/admin/categories')
      }
    })
  },

  putCategory: (req, res) => {
    categoryService.putCategory(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      } else {
        req.flash('success_messages', data['message'])
        return res.redirect('/admin/categories')
      }
    })
  },

  deleteCategory: (req, res) => {
    categoryService.deleteCategory(req, res, (data) => {
      req.flash('success_messages', data['message'])
      return res.redirect('back')
    }).catch(e => console.error(e))
  }
}

module.exports = categoryConroller