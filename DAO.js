const mysql = require('mysql2/promise');

class AppDAO {
  constructor() {
    // Create the connection pool
    this.pool = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: 'Niramay@2000',
      database: 'test',
      port: '3306',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    this.testConnection();
  }

  async testConnection() {
    try {
      const connection = await this.pool.getConnection();
      console.log('Database connection successful');
      connection.release();
    } catch (err) {
      console.error('Database connection failed:', err);
      process.exit(1);
    }
  }

  async run(sql, params = []) {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const [results] = await connection.execute(sql, params);
      return results;
    } catch (err) {
      console.error('Error executing query:', err.message);
      console.error('SQL:', sql);
      console.error('Parameters:', params);
      throw err;
    } finally {
      if (connection) connection.release();
    }
  }

  async close() {
    try {
      await this.pool.end();
      console.log('Database connection pool closed');
    } catch (err) {
      console.error('Error closing database connection:', err);
      throw err;
    }
  }
}

module.exports = AppDAO;
