import { Pool } from "pg";
import "dotenv/config"; // Automatically loads environment variables from .env

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function testConnection() {
    try {
        // Attempt to get a connection from the pool
        const client = await pool.connect();
        console.log('Database connected successfully');
        console.log(client)
        
        // Always release the client back to the pool when done
        client.release();
    } catch (err) {
        console.error('Database connection failed:', err.message);
    } finally {
        // End the pool (only needed if you are shutting down the script)
        await pool.end(); 
    }
}

testConnection();