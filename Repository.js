const queries = require('./queries');

class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  // Fetch all restaurants
  getAllRestaurants() {
    return this.dao.run(queries.getAllRestaurants);
  }

  // Fetch restaurant by ID
  getRestaurantById(restaurantId) {
    return this.dao.run(queries.getRestaurantById, [restaurantId]);
  }

  // Fetch all menu items by restaurant ID
  getMenuItemsByRestaurant(restaurantId) {
    return this.dao.run(queries.getMenuItemsByRestaurant, [restaurantId]);
  }

  // Fetch customer details by customer ID
  async getCustomerById(customerId) {
    try {
      const result = await this.dao.run(queries.getCustomerById, [customerId]);
      console.log('Repository getCustomerById result:', result);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }
  
  // Fetch loyalty card by customer ID
  async getLoyaltyCardByCustomerId(customerId) {
    try {
      const result = await this.dao.run(queries.getLoyaltyCardByCustomerId, [customerId]);
      console.log('Repository getLoyaltyCardByCustomerId result:', result);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  // Fetch all orders by customer ID
  getOrdersByCustomer(customerId) {
    return this.dao.run(queries.getOrdersByCustomer, [customerId]);
  }

  // Fetch all order items by order ID
  getOrderItemsByOrderId(orderId) {
    return this.dao.run(queries.getOrderItemsByOrderId, [orderId]);
  }

  // Fetch order details by order ID
  getOrderById(orderId) {
    return this.dao.run(queries.getOrderById, [orderId]);
  }

  // Fetch payment details by order ID
  async getPaymentByOrderId(orderId) {
    try {
      const result = await this.dao.run(queries.getPaymentByOrderId, [orderId]);
      console.log('Repository getPaymentByOrderId result:', result);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  // Fetch all customers
  getAllCustomers() {
    return this.dao.run(queries.getAllCustomers);
  }

  // Fetch all menu items
  getAllMenuItems() {
    return this.dao.run(queries.getAllMenuItems);
  }
//////////////
 // Get all orders
  getAllOrders() {
    return this.dao.run(queries.getAllOrders);
}

// Get all order items
  getAllOrderItems() {
    return this.dao.run(queries.getAllOrderItems);
}
////////////////////////
  // Fetch all loyalty cards
  getAllLoyaltyCards() {
    return this.dao.run(queries.getAllLoyaltyCards);
  }

  // Fetch all payments
  getAllPayments() {
    return this.dao.run(queries.getAllPayments);
  }


  /**new changes */
  // Business Reports Methods
  async getTopRestaurantsByOrders() {
    try {
      const result = await this.dao.run(queries.getTopRestaurantsByOrders);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async getCustomerLoyaltyReport() {
    try {
      const result = await this.dao.run(queries.getCustomerLoyaltyReport);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async getPopularMenuItems() {
    try {
      const result = await this.dao.run(queries.getPopularMenuItems);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async getPaymentMethodAnalysis() {
    try {
      const result = await this.dao.run(queries.getPaymentMethodAnalysis);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }
  /****** */
  // Restaurant methods
  async insertRestaurant(name, location, cuisine) {
    try {
      const result = await this.dao.run(queries.insertRestaurant, [name, location, cuisine]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }
  async updateRestaurant(id, name, location, cuisine) {
    try {
      const result = await this.dao.run(queries.updateRestaurant, [name, location, cuisine, id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }
  
  async deleteRestaurant(id) {
    try {
      const result = await this.dao.run(queries.deleteRestaurant, [id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  // Menu Item methods

  async insertMenuItem(name, price, restaurantId) {
    try {
      const result = await this.dao.run(queries.insertMenuItem, [name, price, restaurantId]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }
  async updateMenuItem(id, name, price, restaurantId) {
    try {
      const result = await this.dao.run(queries.updateMenuItem, [name, price, restaurantId, id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async deleteMenuItem(id) {
    try {
      const result = await this.dao.run(queries.deleteMenuItem, [id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }
  

  

  // Customer methods
  async insertCustomer(name, loyaltyCardId, contactInfo) {
    try {
      const result = await this.dao.run(queries.insertCustomer, [name, loyaltyCardId, contactInfo]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async updateCustomer(id, name, loyaltyCardId, contactInfo) {
    try {
      const result = await this.dao.run(queries.updateCustomer, [name, loyaltyCardId, contactInfo, id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async deleteCustomer(id) {
    try {
      const result = await this.dao.run(queries.deleteCustomer, [id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  // Loyalty Card methods
  async insertLoyaltyCard(points, discountRate, customerId) {
    try {
      const result = await this.dao.run(queries.insertLoyaltyCard, [points, discountRate, customerId]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async updateLoyaltyCard(id, points, discountRate, customerId) {
    try {
      const result = await this.dao.run(queries.updateLoyaltyCard, [points, discountRate, customerId, id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async deleteLoyaltyCard(id) {
    try {
      const result = await this.dao.run(queries.deleteLoyaltyCard, [id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  // Order methods
  async insertOrder(customerId, totalAmount, tax, tip) {
    try {
      const result = await this.dao.run(queries.insertOrder, [customerId, totalAmount, tax, tip]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async updateOrder(id, customerId, totalAmount, tax, tip) {
    try {
      const result = await this.dao.run(queries.updateOrder, [customerId, totalAmount, tax, tip, id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async deleteOrder(id) {
    try {
      const result = await this.dao.run(queries.deleteOrder, [id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  // Order Item methods
  async insertOrderItem(orderId, itemId, quantity) {
    try {
      const result = await this.dao.run(queries.insertOrderItem, [orderId, itemId, quantity]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async updateOrderItem(id, orderId, itemId, quantity) {
    try {
      const result = await this.dao.run(queries.updateOrderItem, [orderId, itemId, quantity, id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async deleteOrderItem(id) {
    try {
      const result = await this.dao.run(queries.deleteOrderItem, [id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  // Payment methods
  async insertPayment(orderId, paymentType, paymentAmount) {
    try {
      const result = await this.dao.run(queries.insertPayment, [orderId, paymentType, paymentAmount]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async updatePayment(id, orderId, paymentType, paymentAmount) {
    try {
      const result = await this.dao.run(queries.updatePayment, [orderId, paymentType, paymentAmount, id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }

  async deletePayment(id) {
    try {
      const result = await this.dao.run(queries.deletePayment, [id]);
      return result;
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  }
  /****** */
  

}

module.exports = Repository;
