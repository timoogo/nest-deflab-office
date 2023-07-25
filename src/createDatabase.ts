import { createConnection } from 'typeorm';

async function createDatabase() {
  try {
    // Create a connection to the database using TypeORM
    const connection = await createConnection();

    // Log a message indicating that the connection was successful
    console.log(`Connected to database ${connection.options.database}`);

    // Close the connection
    await connection.close();
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
}

// Call the createDatabase function to create the database
createDatabase();