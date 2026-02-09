import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    // process.env looks into your .env.local file automatically
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});