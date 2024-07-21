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

router.get('/', [OrdersController, 'index'])

// User Routes
router.post('/signup', [AuthController, 'signup'])
router.post('/login', [AuthController, 'login'])

// Product Routes
router.get('products', [ProductsController, 'index'])
router.get('products/active', [ProductsController, 'active'])
router.get('products/:id', [ProductsController, 'show'])
router.post('products', [ProductsController, 'store'])
router.put('products/:id', [ProductsController, 'update'])
router.delete('products/:id', [ProductsController, 'delete'])

// Customer Routes
router.get('customers', [CustomersController, 'index'])
router.get('customers/:id', [CustomersController, 'show'])
router.post('customers', [CustomersController, 'store'])
router.put('customers/:id', [CustomersController, 'update'])
router.delete('customers/:id', [CustomersController, 'delete'])

// Orders Route
router.get('orders/store', () => {})
