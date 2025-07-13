// Restaurant model
class Restaurant {
  constructor(restaurantId, name, location, cuisine) {
      this.restaurantId = restaurantId;
      this.name = name;
      this.location = location;
      this.cuisine = cuisine;
  }
}

// Bank Account model
class BankAccount {
  constructor(accountId, bankName, accountNumber, routingNumber, restaurantId) {
      this.accountId = accountId;
      this.bankName = bankName;
      this.accountNumber = accountNumber;
      this.routingNumber = routingNumber;
      this.restaurantId = restaurantId;
  }
}

// Menu Item model
class MenuItem {
  constructor(itemId, name, price, restaurantId) {
      this.itemId = itemId;
      this.name = name;
      this.price = price;
      this.restaurantId = restaurantId;
  }
}

// Customer model
class Customer {
  constructor(customerId, name, loyaltyCardId, contactInfo) {
      this.customerId = customerId;
      this.name = name;
      this.loyaltyCardId = loyaltyCardId;
      this.contactInfo = contactInfo;
  }
}

// Loyalty Card model
class LoyaltyCard {
  constructor(loyaltyCardId, points, discountRate, customerId) {
      this.loyaltyCardId = loyaltyCardId;
      this.points = points;
      this.discountRate = discountRate;
      this.customerId = customerId;
  }
}

// Order model
class Orders {
  constructor(orderId, customerId, totalAmount, tax, tip) {
      this.orderId = orderId;
      this.customerId = customerId;
      this.totalAmount = totalAmount;
      this.tax = tax;
      this.tip = tip;
  }
}

// Order Item model
class OrderItem {
  constructor(orderItemId, orderId, itemId, quantity) {
      this.orderItemId = orderItemId;
      this.orderId = orderId;
      this.itemId = itemId;
      this.quantity = quantity;
  }
}

// Payment model
class Payment {
  constructor(paymentId, orderId, paymentType, paymentAmount) {
      this.paymentId = paymentId;
      this.orderId = orderId;
      this.paymentType = paymentType;
      this.paymentAmount = paymentAmount;
  }
}

module.exports = {
  Restaurant,
  BankAccount,
  MenuItem,
  Customer,
  LoyaltyCard,
  Orders,
  OrderItem,
  Payment,
};
