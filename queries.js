const queries = {
  // 1. Get all restaurants
  getAllRestaurants: 'SELECT * FROM RESTAURANT;',

  // 2. Get a restaurant by its ID
  getRestaurantById: 'SELECT RESTAURANT_ID, R_NAME, LOCATION, CUISINE FROM RESTAURANT WHERE RESTAURANT_ID = ?;',

  // 3. Get all menu items for a specific restaurant
  getMenuItemsByRestaurant: 'SELECT * FROM MENU_ITEM WHERE RESTAURANT_ID = ?;',

  // 4. Get customer details by customer ID
  getCustomerById: 'SELECT CUSTOMER_ID, CUSTOMER_NAME, LOYALTY_CARD_ID, CONTACT_INFO FROM CUSTOMER WHERE CUSTOMER_ID = ?;',

  // 5. Get loyalty card by customer ID
  getLoyaltyCardByCustomerId: 'SELECT LOYALTY_CARD_ID, POINTS, DISCOUNT_RATE, CUSTOMER_ID FROM LOYALTY_CARD WHERE CUSTOMER_ID = ?;',

  // 6. Get all orders by a specific customer
  getOrdersByCustomer: 'SELECT * FROM ORDERS WHERE CUSTOMER_ID = ?;',

  // 7. Get all order items for a specific order ID
  getOrderItemsByOrderId: 'SELECT * FROM ORDER_ITEM WHERE ORDER_ID = ?;',

  // 8. Get order details by order ID
  getOrderById: 'SELECT * FROM ORDERS WHERE ORDER_ID = ?;',

  // 9. Get payment details by order ID
  getPaymentByOrderId: 'SELECT PAYMENT_ID, ORDER_ID, PAYMENT_TYPE, PAYMENT_AMOUNT FROM PAYMENT WHERE ORDER_ID = ?;',

  // 10. Get all customers
  getAllCustomers: 'SELECT * FROM CUSTOMER;',

  // 11. Get all menu items in the system
  getAllMenuItems: 'SELECT * FROM MENU_ITEM;',

  // 12. Get all loyalty cards in the system
  getAllLoyaltyCards: 'SELECT * FROM LOYALTY_CARD;',

  // 13. Get all payments in the system
  getAllPayments: 'SELECT * FROM PAYMENT;',

  /*************/
  getAllOrders: 'SELECT * FROM ORDERS;',
  getAllOrderItems: 'SELECT * FROM ORDER_ITEM;', 
  /***********/

  
  getTopRestaurantsByOrders: `
    SELECT 
      r.RESTAURANT_ID,
      r.R_NAME as Restaurant_Name,
      r.CUISINE as Cuisine_Type,
      COUNT(DISTINCT o.ORDER_ID) as Total_Orders,
      SUM(o.TOTAL_AMOUNT) as Total_Revenue,
      AVG(o.TOTAL_AMOUNT) as Average_Order_Value,
      SUM(o.TIP) as Total_Tips,
      COUNT(DISTINCT c.CUSTOMER_ID) as Unique_Customers
    FROM RESTAURANT r
    LEFT JOIN MENU_ITEM m ON r.RESTAURANT_ID = m.RESTAURANT_ID
    LEFT JOIN ORDER_ITEM oi ON m.ITEM_ID = oi.ITEM_ID
    LEFT JOIN ORDERS o ON oi.ORDER_ID = o.ORDER_ID
    LEFT JOIN CUSTOMER c ON o.CUSTOMER_ID = c.CUSTOMER_ID
    GROUP BY r.RESTAURANT_ID, r.R_NAME, r.CUISINE
    ORDER BY Total_Orders DESC, Total_Revenue DESC
    LIMIT 10;
  `,

  getCustomerLoyaltyReport: `
    SELECT 
      c.CUSTOMER_ID,
      c.CUSTOMER_NAME,
      lc.POINTS,
      COUNT(DISTINCT o.ORDER_ID) as total_orders,
      SUM(o.TOTAL_AMOUNT) as total_spent
    FROM CUSTOMER c
    LEFT JOIN LOYALTY_CARD lc ON c.CUSTOMER_ID = lc.CUSTOMER_ID
    LEFT JOIN ORDERS o ON c.CUSTOMER_ID = o.CUSTOMER_ID
    GROUP BY c.CUSTOMER_ID, c.CUSTOMER_NAME, lc.POINTS
    ORDER BY lc.POINTS DESC;
  `,


  getPopularMenuItems: `
    SELECT 
      m.ITEM_ID,
      m.ITEM_NAME as Item_Name,
      r.R_NAME as Restaurant_Name,
      r.CUISINE as Cuisine_Type,
      COUNT(DISTINCT o.ORDER_ID) as Number_of_Orders,
      SUM(oi.QUANTITY) as Total_Quantity_Ordered,
      m.PRICE as Unit_Price,
      m.PRICE * SUM(oi.QUANTITY) as Total_Revenue,
      COUNT(DISTINCT o.CUSTOMER_ID) as Unique_Customers,
      SUM(oi.QUANTITY) / COUNT(DISTINCT o.ORDER_ID) as Average_Quantity_Per_Order
    FROM MENU_ITEM m
    JOIN RESTAURANT r ON m.RESTAURANT_ID = r.RESTAURANT_ID
    LEFT JOIN ORDER_ITEM oi ON m.ITEM_ID = oi.ITEM_ID
    LEFT JOIN ORDERS o ON oi.ORDER_ID = o.ORDER_ID
    GROUP BY m.ITEM_ID, m.ITEM_NAME, r.R_NAME, r.CUISINE, m.PRICE
    HAVING Number_of_Orders > 0
    ORDER BY Total_Quantity_Ordered DESC, Total_Revenue DESC
    LIMIT 15;
  `,
  /***********/
  // Adding new queries for INSERT operations
  
  insertRestaurant: 'INSERT INTO RESTAURANT (R_NAME, LOCATION, CUISINE) VALUES (?, ?, ?);',
  insertMenuItem: 'INSERT INTO MENU_ITEM (ITEM_NAME, PRICE, RESTAURANT_ID) VALUES (?, ?, ?);',
  insertCustomer: 'INSERT INTO CUSTOMER (CUSTOMER_NAME, LOYALTY_CARD_ID, CONTACT_INFO) VALUES (?, ?, ?);',
  insertLoyaltyCard: 'INSERT INTO LOYALTY_CARD (POINTS, DISCOUNT_RATE, CUSTOMER_ID) VALUES (?, ?, ?);',
  insertOrder: 'INSERT INTO ORDERS (CUSTOMER_ID, TOTAL_AMOUNT, TAX, TIP) VALUES (?, ?, ?, ?);',
  insertOrderItem: 'INSERT INTO ORDER_ITEM (ORDER_ID, ITEM_ID, QUANTITY) VALUES (?, ?, ?);',
  insertPayment: 'INSERT INTO PAYMENT (ORDER_ID, PAYMENT_TYPE, PAYMENT_AMOUNT) VALUES (?, ?, ?);',

  // Adding UPDATE queries
  updateRestaurant: 'UPDATE RESTAURANT SET R_NAME = ?, LOCATION = ?, CUISINE = ? WHERE RESTAURANT_ID = ?;',
  updateMenuItem: 'UPDATE MENU_ITEM SET ITEM_NAME = ?, PRICE = ?, RESTAURANT_ID = ? WHERE ITEM_ID = ?;',
  updateCustomer: 'UPDATE CUSTOMER SET CUSTOMER_NAME = ?, LOYALTY_CARD_ID = ?, CONTACT_INFO = ? WHERE CUSTOMER_ID = ?;',
  updateLoyaltyCard: 'UPDATE LOYALTY_CARD SET POINTS = ?, DISCOUNT_RATE = ?, CUSTOMER_ID = ? WHERE LOYALTY_CARD_ID = ?;',
  updateOrder: 'UPDATE ORDERS SET CUSTOMER_ID = ?, TOTAL_AMOUNT = ?, TAX = ?, TIP = ? WHERE ORDER_ID = ?;',
  updateOrderItem: 'UPDATE ORDER_ITEM SET ORDER_ID = ?, ITEM_ID = ?, QUANTITY = ? WHERE ORDER_ITEM_ID = ?;',
  updatePayment: 'UPDATE PAYMENT SET ORDER_ID = ?, PAYMENT_TYPE = ?, PAYMENT_AMOUNT = ? WHERE PAYMENT_ID = ?;',

  // Adding DELETE queries
  deleteRestaurant: 'DELETE FROM RESTAURANT WHERE RESTAURANT_ID = ?;',
  deleteMenuItem: 'DELETE FROM MENU_ITEM WHERE ITEM_ID = ?;',
  deleteCustomer: 'DELETE FROM CUSTOMER WHERE CUSTOMER_ID = ?;',
  deleteLoyaltyCard: 'DELETE FROM LOYALTY_CARD WHERE LOYALTY_CARD_ID = ?;',
  deleteOrder: 'DELETE FROM ORDERS WHERE ORDER_ID = ?;',
  deleteOrderItem: 'DELETE FROM ORDER_ITEM WHERE ORDER_ITEM_ID = ?;',
  deletePayment: 'DELETE FROM PAYMENT WHERE PAYMENT_ID = ?;',
  /***********/

  getPaymentMethodAnalysis: `
    SELECT 
      PAYMENT_TYPE,
      COUNT(*) as number_of_transactions,
      SUM(PAYMENT_AMOUNT) as total_amount,
      AVG(PAYMENT_AMOUNT) as average_amount
    FROM PAYMENT
    GROUP BY PAYMENT_TYPE
    ORDER BY number_of_transactions DESC;
  `,

  
};

module.exports = queries;
