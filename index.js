const express = require('express');
const cors = require('cors');
const path = require('path');
const AppDAO = require('./DAO');
const Repository = require('./Repository');
const {
  Restaurant,
  BankAccount,
  MenuItem,
  Customer,
  LoyaltyCard,
  Orders,
  OrderItem,
  Payment,
} = require('./model');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DAO and Repository
const dao = new AppDAO();
const repository = new Repository(dao);

// Existing routes...
app.get('/api/restaurants', async (req, res) => {
  console.log('Received request for /api/restaurants');
  try {
    const restaurants = await repository.getAllRestaurants();
    console.log('Retrieved restaurants:', restaurants);
    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found' });
    }
    return res.json(restaurants);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

 
  app.get('/api/restaurants/:id', async (req, res) => {
    console.log('Received request for restaurant with ID:', req.params.id);
    try {
      const { id } = req.params;
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid restaurant ID' });
      }
  
      const restaurant = await repository.getRestaurantById(parseInt(id));
      console.log('Retrieved restaurant:', restaurant);
  
      if (!restaurant || restaurant.length === 0) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      res.json(restaurant);
    } catch (err) {
      console.error('Error fetching restaurant:', err);
      res.status(500).json({ error: 'Server Error', details: err.message });
    }
  });

  app.get('/api/restaurants/:id/menu-items', async (req, res) => {
    try {
      const { id } = req.params;
      const menuItems = await repository.getMenuItemsByRestaurant(id);
      res.json(menuItems);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // Add all your other API routes here with the /api prefix
  app.get('/api/customers/:id', async (req, res) => {
    console.log('Received request for customer with ID:', req.params.id);
    try {
      const { id } = req.params;
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid customer ID' });
      }
  
      const customer = await repository.getCustomerById(parseInt(id));
      console.log('Retrieved customer:', customer);
  
      if (!customer || customer.length === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      res.json(customer);
    } catch (err) {
      console.error('Error fetching customer:', err);
      res.status(500).json({ error: 'Server Error', details: err.message });
    }
  });

// Get loyalty card by customer ID
app.get('/api/customers/:id/loyalty-card', async (req, res) => {
  console.log('Received request for loyalty card for customer ID:', req.params.id);
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid customer ID' });
    }

    const loyaltyCard = await repository.getLoyaltyCardByCustomerId(parseInt(id));
    console.log('Retrieved loyalty card:', loyaltyCard);

    if (!loyaltyCard || loyaltyCard.length === 0) {
      return res.status(404).json({ error: 'Loyalty card not found' });
    }

    res.json(loyaltyCard);
  } catch (err) {
    console.error('Error fetching loyalty card:', err);
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});

// Get all orders by customer ID
app.get('/api/customers/:id/orders', async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await repository.getOrdersByCustomer(id);
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this customer' });
    }
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get order items by order ID
app.get('/api/orders/:id/items', async (req, res) => {
  try {
    const { id } = req.params;
    const orderItems = await repository.getOrderItemsByOrderId(id);
    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({ message: 'No order items found' });
    }
    res.json(orderItems);
  } catch (err) {
    console.error('Error fetching order items:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await repository.getOrderById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get payment by order ID
app.get('/api/orders/:id/payment', async (req, res) => {
  console.log('Received request for payment for order ID:', req.params.id);
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    const payment = await repository.getPaymentByOrderId(parseInt(id));
    console.log('Retrieved payment:', payment);

    if (!payment || payment.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);
  } catch (err) {
    console.error('Error fetching payment:', err);
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});

// Get all customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await repository.getAllCustomers();
    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: 'No customers found' });
    }
    res.json(customers);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all menu items
app.get('/api/menu-items', async (req, res) => {
  try {
    const menuItems = await repository.getAllMenuItems();
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found' });
    }
    res.json(menuItems);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all loyalty cards
app.get('/api/loyalty-cards', async (req, res) => {
  try {
    const loyaltyCards = await repository.getAllLoyaltyCards();
    if (!loyaltyCards || loyaltyCards.length === 0) {
      return res.status(404).json({ message: 'No loyalty cards found' });
    }
    res.json(loyaltyCards);
  } catch (err) {
    console.error('Error fetching loyalty cards:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
////////
// Get all orders
app.get('/api/orders', async (req, res) => {
  console.log('Received request for all orders');
  try {
    const orders = await repository.getAllOrders();
    console.log('Retrieved orders:', orders);
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all order items
app.get('/api/order-items', async (req, res) => {
  console.log('Received request for all order items');
  try {
    const orderItems = await repository.getAllOrderItems();
    console.log('Retrieved order items:', orderItems);
    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({ message: 'No order items found' });
    }
    res.json(orderItems);
  } catch (err) {
    console.error('Error fetching order items:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
////////

// Get all payments
app.get('/api/payments', async (req, res) => {
  try {
    const payments = await repository.getAllPayments();
    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: 'No payments found' });
    }
    res.json(payments);
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



/**new changes */
// Business Reports Routes
app.get('/api/reports/top-restaurants', async (req, res) => {
  try {
    const report = await repository.getTopRestaurantsByOrders();
    res.json(report);
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/reports/customer-loyalty', async (req, res) => {
  try {
    const report = await repository.getCustomerLoyaltyReport();
    res.json(report);
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/reports/popular-items', async (req, res) => {
  try {
    const report = await repository.getPopularMenuItems();
    res.json(report);
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/reports/payment-analysis', async (req, res) => {
  try {
    const report = await repository.getPaymentMethodAnalysis();
    res.json(report);
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
/** */
/***** */
// restaurant routes
app.post('/api/restaurants', async (req, res) => {
  try {
    const { name, location, cuisine } = req.body;
    const result = await repository.insertRestaurant(name, location, cuisine);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating restaurant:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.put('/api/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, cuisine } = req.body;
    const result = await repository.updateRestaurant(id, name, location, cuisine);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(result);
  } catch (err) {
    console.error('Error updating restaurant:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.delete('/api/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await repository.deleteRestaurant(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    console.error('Error deleting restaurant:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// menu-item routes
app.post('/api/menu-items', async (req, res) => {
  console.log('Received menu item data:', req.body); // Add this line
  try {
    const { ITEM_NAME, PRICE, RESTAURANT_ID } = req.body;
    console.log('Extracted values:', { ITEM_NAME, PRICE, RESTAURANT_ID }); // Add this line
    const result = await repository.insertMenuItem(ITEM_NAME, PRICE, RESTAURANT_ID);
    console.log('Insert result:', result); // Add this line
    res.status(201).json(result);
  } catch (err) {
    console.error('Detailed error:', err); // Modified this line
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});

app.put('/api/menu-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, restaurantId } = req.body;
    const result = await repository.updateMenuItem(id, name, price, restaurantId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(result);
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.delete('/api/menu-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await repository.deleteMenuItem(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    console.error('Error deleting menu item:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Customer routes
app.post('/api/customers', async (req, res) => {
  try {
    const { name, loyaltyCardId, contactInfo } = req.body;
    const result = await repository.insertCustomer(name, loyaltyCardId, contactInfo);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.put('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, loyaltyCardId, contactInfo } = req.body;
    const result = await repository.updateCustomer(id, name, loyaltyCardId, contactInfo);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(result);
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await repository.deleteCustomer(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Loyalty Card routes
app.post('/api/loyalty-cards', async (req, res) => {
  try {
    const { points, discountRate, customerId } = req.body;
    const result = await repository.insertLoyaltyCard(points, discountRate, customerId);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating loyalty card:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.put('/api/loyalty-cards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { points, discountRate, customerId } = req.body;
    const result = await repository.updateLoyaltyCard(id, points, discountRate, customerId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Loyalty card not found' });
    }
    res.json(result);
  } catch (err) {
    console.error('Error updating loyalty card:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.delete('/api/loyalty-cards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await repository.deleteLoyaltyCard(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Loyalty card not found' });
    }
    res.json({ message: 'Loyalty card deleted successfully' });
  } catch (err) {
    console.error('Error deleting loyalty card:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Order routes
app.post('/api/orders', async (req, res) => {
  try {
    const { customerId, totalAmount, tax, tip } = req.body;
    const result = await repository.insertOrder(customerId, totalAmount, tax, tip);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  console.log('Received order update request:', req.params, req.body);
  try {
    const { id } = req.params;
    const { customerId, totalAmount, tax, tip } = req.body;
    const result = await repository.updateOrder(id, customerId, totalAmount, tax, tip);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(result);
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await repository.deleteOrder(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Order Item routes
app.post('/api/order-items', async (req, res) => {
  try {
    const { orderId, itemId, quantity } = req.body;
    const result = await repository.insertOrderItem(orderId, itemId, quantity);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating order item:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.put('/api/order-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId, itemId, quantity } = req.body;
    const result = await repository.updateOrderItem(id, orderId, itemId, quantity);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.json(result);
  } catch (err) {
    console.error('Error updating order item:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.delete('/api/order-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await repository.deleteOrderItem(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.json({ message: 'Order item deleted successfully' });
  } catch (err) {
    console.error('Error deleting order item:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Payment routes
app.post('/api/payments', async (req, res) => {
  try {
    const { orderId, paymentType, paymentAmount } = req.body;
    const result = await repository.insertPayment(orderId, paymentType, paymentAmount);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating payment:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.put('/api/payments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId, paymentType, paymentAmount } = req.body;
    const result = await repository.updatePayment(id, orderId, paymentType, paymentAmount);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(result);
  } catch (err) {
    console.error('Error updating payment:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.delete('/api/payments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await repository.deletePayment(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error('Error deleting payment:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});
/**** */


// Serve static files AFTER API routes
app.use('/', express.static(path.join(__dirname, 'public')));

// Handle SPA routing
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    res.status(404).json({ error: 'API route not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Create server with error handling
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/restaurants`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy. Trying port ${PORT + 1}`);
    server.listen(PORT + 1);
  } else {
    console.error('Server error:', err);
  }
});



// Graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  server.close(() => {
    console.log('Http server closed.');
    dao.close().then(() => {
      console.log('Database connection closed.');
      process.exit(0);
    });
  });
});

