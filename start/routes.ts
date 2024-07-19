/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import ProductsController from '#controllers/products_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// User Routes
router.post('/signup', [AuthController, 'signup'])
router.post('/login', [AuthController, 'login'])

// Product Routes
router.get('products', [ProductsController, 'index'])
router.get('products/active', [ProductsController, 'active'])
router.get('products/:id', [ProductsController, 'show'])
router.post('products', [ProductsController, 'store'])
router.put('products/:id', () => { })
router.delete('products/:id', () => { })

// Customer Routes
router.get('customers', () => { })
router.get('customers/:id', () => { })
router.post('customers', () => { })
router.put('customers/:id', () => { })
router.delete('customers/:id', () => { })

// Orders Route
router.get('orders/store', () => { })
