import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create the pool once
const connectionPool = mysql.createPool(dbConfig);

// Export it under both names so NO pages break
export const db = connectionPool;
export const pool = connectionPool;