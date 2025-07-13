🍽️ Restaurant Management System

This is a Node.js-based restaurant management backend system designed to handle restaurant data via a REST API. It connects to a MySQL database and provides endpoints for retrieving restaurant information.

🚀 Features

RESTful API for restaurant data

MySQL database connection

Lightweight Express.js server

Webpack-based build setup

📸 Screenshot


![App Screenshot](https://github.com/user-attachments/assets/80a088ee-51ba-4939-97d3-969d871e790e)

🛠️ Technologies Used

Node.js

Express

MySQL

Webpack

📂 Project Structure

restaurant-management-project/
├── index.js             # Entry point of the application
├── config/              # DB config files
├── routes/              # Express routes
├── models/              # DB query logic
├── package.json

🧪 Getting Started

1. Clone the repository

git clone https://github.com/AshishASuvarna/restaurant-management-project.git

cd restaurant-management-project

2. Install dependencies

npm install

3. Configure your environment

Create a .env file or update your config/db.js with:

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'restaurant'
});

⚠️ Make sure MySQL is running locally on port 3306.

4. Start the server

npm start

Server runs at: http://localhost:3000API endpoint: http://localhost:3000/api/restaurants

📄 License

This project is licensed under the MIT License.

👤 Author

Ashish A Suvarna
