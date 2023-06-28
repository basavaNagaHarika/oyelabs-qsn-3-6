const mysql = require("mysql2/promise");
require("dotenv").config();

// MySQL connection configuration
const connectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

// Function to insert data into MySQL
async function insertData(dataArray) {
    try {
        // Create a connection to the MySQL database
        const connection = await mysql.createConnection(connectionConfig);

        // Iterate over the data array
        for (const data of dataArray) {
            const { email, name } = data;

            // Check if the email already exists in the database
            const [existingCustomer] = await connection.query(
                "SELECT customerId FROM customers WHERE email = ?",
                [email]
            );

            if (existingCustomer.length > 0) {
                // Update the name of the existing customer
                await connection.query(
                    "UPDATE customers SET name = ? WHERE customerId = ?",
                    [name, existingCustomer[0].customerId]
                );
            } else {
                // Insert a new customer
                await connection.query(
                    "INSERT INTO customers (name, email) VALUES (?, ?)",
                    [name, email]
                );
            }
            const result = await connection.query(
                "SELECT * FROM customers where email = ?",
                [email]
            );

            console.log(result[0]);
        }

        console.log("Data inserted successfully");

        // Close the database connection
        await connection.end();
    } catch (error) {
        console.error("Error inserting data:", error);
    }
}

// Usage example
const dataArray = [
    { email: "ravi123@gmail.com", name: "revi" },
    { email: "kishan11@gmail.com", name: "kishan" },
];

insertData(dataArray);
