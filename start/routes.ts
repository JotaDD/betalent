/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const CustomersController = () => import('#controllers/customers_controller')
const OrdersController = () => import('#controllers/orders_controller')
const ProductsController = () => import('#controllers/products_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// User Routes
router.post('/signup', [AuthController, 'signup'])
router.post('/login', [AuthController, 'login'])

// Product Routes
router.get('products', [ProductsController, 'index']).use(middleware.auth())
router.get('products/active', [ProductsController, 'active']).use(middleware.auth())
router.get('products/:id', [ProductsController, 'show']).use(middleware.auth())
router.post('products', [ProductsController, 'store']).use(middleware.auth())
router.put('products/:id', [ProductsController, 'update']).use(middleware.auth())
router.delete('products/:id', [ProductsController, 'delete']).use(middleware.auth())

// Customer Routes
router.get('customers', [CustomersController, 'index']).use(middleware.auth())
router.get('customers/:id', [CustomersController, 'show']).use(middleware.auth())
router.post('customers', [CustomersController, 'store']).use(middleware.auth())
router.put('customers/:id', [CustomersController, 'update']).use(middleware.auth())
router.delete('customers/:id', [CustomersController, 'delete']).use(middleware.auth())

// Orders Route
router.post('orders', [OrdersController, 'store']).use(middleware.auth())
