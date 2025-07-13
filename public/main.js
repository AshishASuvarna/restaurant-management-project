// Utility function to fetch data from the server
const baseUrl = 'http://localhost:3000/api'; // Add /api to base URL

const fetchData = async (url) => {
  try {
    const response = await fetch(`${baseUrl}${url}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    alert('Failed to fetch data: ' + error.message);
    throw error;
  }
};
// Add formatting helper function
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Utility function to populate tables

const populateTable = (tableId, data, columns) => {
  const tableBody = document.querySelector(`#${tableId} tbody`);
  tableBody.innerHTML = '';
  
  data.forEach((item) => {
    const row = document.createElement('tr');
    columns.forEach((col) => {
      const cell = document.createElement('td');
      let value = item[col];
      
      // Format currency values
      if (col.includes('Price') || col.includes('Revenue') || col.includes('Tips')) {
        value = formatCurrency(value);
      }
      // Format decimal values
      else if (typeof value === 'number' && !Number.isInteger(value)) {
        value = value.toFixed(2);
      }
      
      cell.textContent = value || 'N/A';
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
};


// Fetch and display all restaurants
const displayAllRestaurants = async () => {
  const data = await fetchData('/restaurants');
  if (data) {
    populateTable('restaurant-details-table', data, ['RESTAURANT_ID', 'R_NAME', 'LOCATION', 'CUISINE']);
  }
};

// Fetch and display restaurant by ID
const getRestaurantById = async () => {
  const id = document.querySelector('#restaurant-id').value;
  if (!id) return alert('Please enter a Restaurant ID.');
  
  try {
    const restaurant = await fetchData(`/restaurants/${id}`);
    if (restaurant) {
      // Ensure we're using the correct column names and handle array response
      populateTable('restaurant-details-table', [restaurant[0]], [
        'RESTAURANT_ID',
        'R_NAME',
        'LOCATION',
        'CUISINE'
      ]);
    }
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    alert('Failed to fetch restaurant details: ' + error.message);
  }
};

// Fetch and display all menu items
const displayAllMenuItems = async () => {
  const menuItems = await fetchData('/menu-items');
  if (menuItems) {
    populateTable('menu-items-table', menuItems, ['ITEM_ID', 'ITEM_NAME', 'PRICE', 'RESTAURANT_ID']);
  }
};

// Fetch and display menu items by restaurant ID
const getMenuItemsByRestaurant = async () => {
  const id = document.querySelector('#menu-restaurant-id').value;
  if (!id) return alert('Please enter a Restaurant ID.');
  const menuItems = await fetchData(`/restaurants/${id}/menu-items`);
  if (menuItems) {
    populateTable('menu-items-table', menuItems, ['ITEM_ID', 'ITEM_NAME', 'PRICE', 'RESTAURANT_ID']);
  }
};

// Fetch and display all customers
const displayAllCustomers = async () => {
  const customers = await fetchData('/customers');
  if (customers) {
    populateTable('customer-details-table', customers, ['CUSTOMER_ID', 'CUSTOMER_NAME', 'LOYALTY_CARD_ID', 'CONTACT_INFO']);
  }
};

// Fetch and display customer by ID
const getCustomerById = async () => {
  const id = document.querySelector('#customer-id').value;
  if (!id) return alert('Please enter a Customer ID.');
  
  try {
    const customer = await fetchData(`/customers/${id}`);
    if (customer) {
      populateTable('customer-details-table', [customer[0]], [
        'CUSTOMER_ID',
        'CUSTOMER_NAME',
        'LOYALTY_CARD_ID',
        'CONTACT_INFO'
      ]);
    }
  } catch (error) {
    console.error('Error fetching customer:', error);
    alert('Failed to fetch customer details: ' + error.message);
  }
};

// Fetch and display all loyalty cards
const displayAllLoyaltyCards = async () => {
  const loyaltyCards = await fetchData('/loyalty-cards');
  if (loyaltyCards) {
    populateTable('loyalty-card-table', loyaltyCards, ['LOYALTY_CARD_ID', 'POINTS', 'DISCOUNT_RATE', 'CUSTOMER_ID']);
  }
};

// Fetch and display loyalty card by customer ID
const getLoyaltyCardByCustomerId = async () => {
  const id = document.querySelector('#loyalty-customer-id').value;
  if (!id) return alert('Please enter a Customer ID.');
  
  try {
    const loyaltyCard = await fetchData(`/customers/${id}/loyalty-card`);
    if (loyaltyCard) {
      populateTable('loyalty-card-table', [loyaltyCard[0]], [
        'LOYALTY_CARD_ID',
        'POINTS',
        'DISCOUNT_RATE',
        'CUSTOMER_ID'
      ]);
    }
  } catch (error) {
    console.error('Error fetching loyalty card:', error);
    alert('Failed to fetch loyalty card details: ' + error.message);
  }
};

// Fetch and display all orders
// Updated Orders functions
const displayAllOrders = async () => {
  const orders = await fetchData('/orders');
  if (orders) {
    populateTable('orders-table', orders, ['ORDER_ID', 'CUSTOMER_ID', 'TOTAL_AMOUNT', 'TAX', 'TIP']);
  }
};

const getOrdersByCustomer = async () => {
  const id = document.querySelector('#order-customer-id').value;
  if (!id) return alert('Please enter a Customer ID.');
  const orders = await fetchData(`/customers/${id}/orders`);
  if (orders) {
    populateTable('orders-table', orders, ['ORDER_ID', 'CUSTOMER_ID', 'TOTAL_AMOUNT', 'TAX', 'TIP']);
  }
};

// Added Display All for Order Items
const displayAllOrderItems = async () => {
  const orderItems = await fetchData('/order-items');
  if (orderItems) {
    populateTable('order-items-table', orderItems, ['ORDER_ITEM_ID', 'ORDER_ID', 'ITEM_ID', 'QUANTITY']);
  }
};

const getOrderItemsByOrderId = async () => {
  const id = document.querySelector('#order-items-id').value;
  if (!id) return alert('Please enter an Order ID.');
  const orderItems = await fetchData(`/orders/${id}/items`);
  if (orderItems) {
    populateTable('order-items-table', orderItems, ['ORDER_ITEM_ID', 'ORDER_ID', 'ITEM_ID', 'QUANTITY']);
  }
};
///////////
// Fetch and display all payments
const displayAllPayments = async () => {
  const payments = await fetchData('/payments');
  if (payments) {
    populateTable('payment-details-table', payments, ['PAYMENT_ID', 'ORDER_ID', 'PAYMENT_TYPE', 'PAYMENT_AMOUNT']);
  }
};

// Fetch and display payment by order ID
const getPaymentByOrderId = async () => {
  const id = document.querySelector('#payment-order-id').value;
  if (!id) return alert('Please enter an Order ID.');
  
  try {
    const payment = await fetchData(`/orders/${id}/payment`);
    if (payment) {
      populateTable('payment-details-table', payment, [
        'PAYMENT_ID',
        'ORDER_ID',
        'PAYMENT_TYPE',
        'PAYMENT_AMOUNT'
      ]);
    }
  } catch (error) {
    console.error('Error fetching payment:', error);
    alert('Failed to fetch payment details: ' + error.message);
  }
};

/**new changes */
// Display top restaurants report
const displayTopRestaurants = async () => {
  try {
    const data = await fetchData('/reports/top-restaurants');
    if (data) {
      populateTable('top-restaurants-table', data, [
        'Restaurant_Name',
        'Cuisine_Type',
        'Total_Orders',
        'Total_Revenue',
        'Average_Order_Value',
        'Total_Tips',
        'Unique_Customers'
      ]);
    }
  } catch (error) {
    console.error('Error fetching top restaurants report:', error);
  }
};

// Display customer loyalty report
const displayCustomerLoyalty = async () => {
  try {
    const data = await fetchData('/reports/customer-loyalty');
    populateTable('customer-loyalty-table', data, [
      'CUSTOMER_NAME',
      'POINTS',
      'total_orders',
      'total_spent'
    ]);
  } catch (error) {
    console.error('Error fetching customer loyalty report:', error);
  }
};

// Display popular items report
const displayPopularItems = async () => {
  try {
    const data = await fetchData('/reports/popular-items');
    if (data) {
      populateTable('popular-items-table', data, [
        'Item_Name',
        'Restaurant_Name',
        'Cuisine_Type',
        'Number_of_Orders',
        'Total_Quantity_Ordered',
        'Unit_Price',
        'Total_Revenue',
        'Unique_Customers',
        'Average_Quantity_Per_Order'
      ]);
    }
  } catch (error) {
    console.error('Error fetching popular items report:', error);
  }
};

// Display payment analysis report
const displayPaymentAnalysis = async () => {
  try {
    const data = await fetchData('/reports/payment-analysis');
    populateTable('payment-analysis-table', data, [
      'PAYMENT_TYPE',
      'number_of_transactions',
      'total_amount',
      'average_amount'
    ]);
  } catch (error) {
    console.error('Error fetching payment analysis report:', error);
  }
};
/** */

/*** */
// CREATE operations
// Example for Restaurant insert
async function addRestaurant(event) {
  event.preventDefault();
  const name = document.getElementById('new-restaurant-name').value;
  const location = document.getElementById('new-restaurant-location').value;
  const cuisine = document.getElementById('new-restaurant-cuisine').value;

  try {
      const response = await fetch(`${baseUrl}/restaurants`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
              name: name,
              location: location, 
              cuisine: cuisine 
          })
      });

      const data = await response.json();
      
      if (!response.ok) {
          throw new Error(data.error || 'Failed to add restaurant');
      }
      
      alert('Restaurant added successfully!');
      displayAllRestaurants();
      event.target.reset();
  } catch (error) {
      console.error('Detailed error:', error);
      alert('Failed to add restaurant: ' + error.message);
  }
}

async function addMenuItem(event) {
  event.preventDefault();
  const itemName = document.getElementById('new-item-name').value;
  const price = document.getElementById('new-item-price').value;
  const restaurantId = document.getElementById('new-item-restaurant-id').value;

  console.log('Sending data:', { itemName, price, restaurantId }); // Add this line

  try {
      const response = await fetch(`${baseUrl}/menu-items`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              ITEM_NAME: itemName,
              PRICE: parseFloat(price),
              RESTAURANT_ID: parseInt(restaurantId)
          })
      });

      const data = await response.json();
      console.log('Server response:', data); // Add this line
      
      if (!response.ok) {
          throw new Error(data.error || data.details || 'Failed to add menu item');
      }
      
      alert('Menu item added successfully!');
      displayAllMenuItems();
      event.target.reset();
  } catch (error) {
      console.error('Detailed error:', error);
      alert('Failed to add menu item: ' + error.message);
  }
}

// UPDATE operations
async function updateRestaurant(event) {
  event.preventDefault();
  const id = document.getElementById('update-restaurant-id').value;
  const name = document.getElementById('update-restaurant-name').value;
  const location = document.getElementById('update-restaurant-location').value;
  const cuisine = document.getElementById('update-restaurant-cuisine').value;

  try {
      const response = await fetch(`${baseUrl}/restaurants/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, location, cuisine })
      });

      if (!response.ok) throw new Error('Failed to update restaurant');
      
      alert('Restaurant updated successfully!');
      displayAllRestaurants();
      event.target.reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to update restaurant: ' + error.message);
  }
}

async function updateMenuItem(event) {
  event.preventDefault();
  const id = document.getElementById('update-item-id').value;
  const name = document.getElementById('update-item-name').value;
  const price = document.getElementById('update-item-price').value;
  const restaurantId = document.getElementById('update-item-restaurant-id').value;

  try {
      const response = await fetch(`${baseUrl}/menu-items/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, price, restaurantId })
      });

      if (!response.ok) throw new Error('Failed to update menu item');
      
      alert('Menu item updated successfully!');
      displayAllMenuItems();
      event.target.reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to update menu item: ' + error.message);
  }
}

// DELETE operations
async function deleteRestaurant() {
  const id = document.getElementById('delete-restaurant-id').value;
  if (!id) {
      alert('Please enter a Restaurant ID');
      return;
  }

  if (!confirm('Are you sure you want to delete this restaurant?')) return;

  try {
      const response = await fetch(`${baseUrl}/restaurants/${id}`, {
          method: 'DELETE'
      });

      const data = await response.json();
      
      if (!response.ok) {
          throw new Error(data.error || 'Failed to delete restaurant');
      }
      
      alert('Restaurant deleted successfully!');
      displayAllRestaurants();
      document.getElementById('delete-restaurant-id').value = '';
  } catch (error) {
      console.error('Delete error:', error);
      if (error.message.includes('foreign key constraint')) {
          alert('Cannot delete this restaurant because it has related records (menu items, orders, etc.)');
      } else {
          alert('Failed to delete restaurant: ' + error.message);
      }
  }
}

async function deleteMenuItem() {
  const id = document.getElementById('delete-menu-item-id').value;
  if (!id) {
      alert('Please enter an Item ID');
      return;
  }

  if (!confirm('Are you sure you want to delete this menu item?')) return;

  try {
      const response = await fetch(`${baseUrl}/menu-items/${id}`, {
          method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete menu item');
      
      alert('Menu item deleted successfully!');
      displayAllMenuItems();
      document.getElementById('delete-menu-item-id').value = '';
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete menu item: ' + error.message);
  }
}

async function addCustomer(event) {
  event.preventDefault();
  const name = document.getElementById('new-customer-name').value;
  const loyaltyCardId = document.getElementById('new-customer-loyalty-id').value;
  const contactInfo = document.getElementById('new-customer-contact').value;

  try {
      const response = await fetch(`${baseUrl}/customers`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, loyaltyCardId, contactInfo })
      });

      if (!response.ok) throw new Error('Failed to add customer');
      
      const result = await response.json();
      alert('Customer added successfully!');
      displayAllCustomers();
      event.target.reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to add customer: ' + error.message);
  }
}

async function updateCustomer(event) {
  event.preventDefault();
  const id = document.getElementById('update-customer-id').value;
  const name = document.getElementById('update-customer-name').value;
  const loyaltyCardId = document.getElementById('update-customer-loyalty-id').value;
  const contactInfo = document.getElementById('update-customer-contact').value;

  try {
      const response = await fetch(`${baseUrl}/customers/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, loyaltyCardId, contactInfo })
      });

      if (!response.ok) throw new Error('Failed to update customer');
      
      alert('Customer updated successfully!');
      displayAllCustomers();
      event.target.reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to update customer: ' + error.message);
  }
}

async function deleteCustomer() {
  const id = document.getElementById('delete-customer-id').value;
  if (!id) {
      alert('Please enter a Customer ID');
      return;
  }

  if (!confirm('Are you sure you want to delete this customer?')) return;

  try {
      const response = await fetch(`${baseUrl}/customers/${id}`, {
          method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete customer');
      
      alert('Customer deleted successfully!');
      displayAllCustomers();
      document.getElementById('delete-customer-id').value = '';
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete customer: ' + error.message);
  }
}

// Loyalty Card operations
async function addLoyaltyCard(event) {
  event.preventDefault();
  const points = document.getElementById('new-loyalty-points').value;
  const discountRate = document.getElementById('new-loyalty-discount').value;
  const customerId = document.getElementById('new-loyalty-customer-id').value;

  try {
      const response = await fetch(`${baseUrl}/loyalty-cards`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ points, discountRate, customerId })
      });

      if (!response.ok) throw new Error('Failed to add loyalty card');
      
      const result = await response.json();
      alert('Loyalty card added successfully!');
      displayAllLoyaltyCards();
      event.target.reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to add loyalty card: ' + error.message);
  }
}

async function updateLoyaltyCard(event) {
  event.preventDefault();
  const id = document.getElementById('update-loyalty-id').value;
  const points = document.getElementById('update-loyalty-points').value;
  const discountRate = document.getElementById('update-loyalty-discount').value;
  //const customerId = document.getElementById('new-loyalty-customer-id').value;
  const customerId = document.getElementById('update-loyalty-customer-id').value;

  try {
      const response = await fetch(`${baseUrl}/loyalty-cards/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ points, discountRate, customerId })
      });

      if (!response.ok) throw new Error('Failed to update loyalty card');
      
      alert('Loyalty card updated successfully!');
      displayAllLoyaltyCards();
      event.target.reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to update loyalty card: ' + error.message);
  }
}

async function deleteLoyaltyCard() {
  const id = document.getElementById('delete-loyalty-card-id').value;
  if (!id) {
      alert('Please enter a Loyalty Card ID');
      return;
  }

  if (!confirm('Are you sure you want to delete this loyalty card?')) return;

  try {
      const response = await fetch(`${baseUrl}/loyalty-cards/${id}`, {
          method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete loyalty card');
      
      alert('Loyalty card deleted successfully!');
      displayAllLoyaltyCards();
      document.getElementById('delete-loyalty-card-id').value = '';
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete loyalty card: ' + error.message);
  }
}

// Order operations
async function addOrder(event) {
  event.preventDefault();
  const customerId = document.getElementById('new-order-customer-id').value;
  const totalAmount = document.getElementById('new-order-total').value;
  const tax = document.getElementById('new-order-tax').value;
  const tip = document.getElementById('new-order-tip').value;

  try {
      const response = await fetch(`${baseUrl}/orders`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customerId, totalAmount, tax, tip })
      });

      if (!response.ok) throw new Error('Failed to add order');
      
      const result = await response.json();
      alert('Order added successfully!');
      displayAllOrders();
      event.target.reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to add order: ' + error.message);
  }
}

async function updateOrder(event) {
  event.preventDefault();
  console.log('Update Order triggered');
  const id = document.getElementById('update-order-id').value;
  console.log('Order ID:', id);
  const customerId = document.getElementById('update-order-customer-id').value;
  const totalAmount = document.getElementById('update-order-total').value;
  const tax = document.getElementById('update-order-tax').value;
  const tip = document.getElementById('update-order-tip').value;

  try {
      const response = await fetch(`${baseUrl}/orders/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customerId, totalAmount, tax, tip })
      });

      if (!response.ok) throw new Error('Failed to update order');
      
      alert('Order updated successfully!');
      displayAllOrders();
      event.target.reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to update order: ' + error.message);
  }
}

async function deleteOrder() {
  const id = document.getElementById('delete-order-id').value;
  if (!id) {
      alert('Please enter an Order ID');
      return;
  }

  if (!confirm('Are you sure you want to delete this order?')) return;

  try {
      const response = await fetch(`${baseUrl}/orders/${id}`, {
          method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete order');
      
      alert('Order deleted successfully!');
      displayAllOrders();
      document.getElementById('delete-order-id').value = '';
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete order: ' + error.message);
  }
}

// Order Item operations
async function addOrderItem(event) {
  event.preventDefault();
  const orderId = document.getElementById('new-order-item-order-id').value;
  const itemId = document.getElementById('new-order-item-item-id').value;
  const quantity = document.getElementById('new-order-item-quantity').value;

  try {
      const response = await fetch(`${baseUrl}/order-items`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId, itemId, quantity })
      });

      if (!response.ok) throw new Error('Failed to add order item');
      
      const result = await response.json();
      alert('Order item added successfully!');
      displayAllOrderItems();
      event.target.reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to add order item: ' + error.message);
  }
}

async function updateOrderItem(event) {
  event.preventDefault();
  const id = document.getElementById('update-order-item-id').value;
  const orderId = document.getElementById('update-order-item-order-id').value;
  const itemId = document.getElementById('update-order-item-item-id').value;
  const quantity = document.getElementById('update-order-item-quantity').value;

  try {
      const response = await fetch(`${baseUrl}/order-items/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId, itemId, quantity })
      });

      if (!response.ok) throw new Error('Failed to update order item');
      
      alert('Order item updated successfully!');
      displayAllOrderItems();
      event.target.reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to update order item: ' + error.message);
  }
}

async function deleteOrderItem() {
  const id = document.getElementById('delete-order-item-id').value;
  if (!id) {
      alert('Please enter an Order Item ID');
      return;
  }

  if (!confirm('Are you sure you want to delete this order item?')) return;

  try {
      const response = await fetch(`${baseUrl}/order-items/${id}`, {
          method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete order item');
      
      alert('Order item deleted successfully!');
      displayAllOrderItems();
      document.getElementById('delete-order-item-id').value = '';
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete order item: ' + error.message);
  }
}

// Payment operations
async function addPayment(event) {
  event.preventDefault();
  const orderId = document.getElementById('new-payment-order-id').value;
  const paymentType = document.getElementById('new-payment-type').value;
  const paymentAmount = document.getElementById('new-payment-amount').value;

  try {
      const response = await fetch(`${baseUrl}/payments`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId, paymentType, paymentAmount })
      });

      if (!response.ok) throw new Error('Failed to add payment');
      
      const result = await response.json();
      alert('Payment added successfully!');
      displayAllPayments();
      event.target.reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to add payment: ' + error.message);
  }
}

async function updatePayment(event) {
  event.preventDefault();
  const id = document.getElementById('update-payment-id').value;
  const orderId = document.getElementById('update-payment-order-id').value;
  const paymentType = document.getElementById('update-payment-type').value;
  const paymentAmount = document.getElementById('update-payment-amount').value;

  try {
      const response = await fetch(`${baseUrl}/payments/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId, paymentType, paymentAmount })
      });

      if (!response.ok) throw new Error('Failed to update payment');
      
      alert('Payment updated successfully!');
      displayAllPayments();
      event.target.reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to update payment: ' + error.message);
  }
}

async function deletePayment() {
  const id = document.getElementById('delete-payment-id').value;
  if (!id) {
      alert('Please enter a Payment ID');
      return;
  }

  if (!confirm('Are you sure you want to delete this payment?')) return;

  try {
      const response = await fetch(`${baseUrl}/payments/${id}`, {
          method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete payment');
      
      alert('Payment deleted successfully!');
      displayAllPayments();
      document.getElementById('delete-payment-id').value = '';
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete payment: ' + error.message);
  }
}

// Add event listeners when the document loads
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('add-restaurant-form').addEventListener('submit', addRestaurant);
  document.getElementById('update-restaurant-form').addEventListener('submit', updateRestaurant);
  document.getElementById('add-menu-item-form').addEventListener('submit', addMenuItem);
  document.getElementById('update-menu-item-form').addEventListener('submit', updateMenuItem);
  document.getElementById('add-customer-form').addEventListener('submit', addCustomer);
  document.getElementById('update-customer-form').addEventListener('submit', updateCustomer);
  document.getElementById('add-loyalty-card-form').addEventListener('submit', addLoyaltyCard);
  document.getElementById('update-loyalty-card-form').addEventListener('submit', updateLoyaltyCard);
  document.getElementById('add-order-form').addEventListener('submit', addOrder);
  document.getElementById('update-order-form').addEventListener('submit', updateOrder);
  document.getElementById('add-order-item-form').addEventListener('submit', addOrderItem);
  document.getElementById('update-order-item-form').addEventListener('submit', updateOrderItem);
  document.getElementById('add-payment-form').addEventListener('submit', addPayment);
  document.getElementById('update-payment-form').addEventListener('submit', updatePayment);  
});
/** */