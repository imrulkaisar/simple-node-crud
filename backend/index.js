// Import necessary packages
const express = require("express"); // Express framework for creating the server
const cors = require("cors"); // Cors for enabling cross-origin resource sharing
const app = express(); // Create an instance of the Express application
const port = process.env.PORT || 5000; // Define the port for the server to listen on

// Apply middlewares for the Express application
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for the app
app.use(express.json()); // Enable parsing of JSON data in the request body

// MongoDB connection setup
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb"); // Import necessary MongoDB packages
const uri =
  "mongodb+srv://imrulkaisar:0ZI8mdywF8N7xHb6@cluster0.itr0uhy.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB connection string

// Create a MongoClient with specified server API version and options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // Specify the version of the MongoDB server API
    strict: true, // Enable strict mode for the server
    deprecationErrors: true, // Enable errors for deprecated features
  },
});

// Function to execute MongoDB operations
async function run() {
  try {
    // Connect the client to the MongoDB server
    await client.connect();

    // Access the required database and collection
    const database = client.db("simpleCrud"); // Access the 'simpleCrud' database
    const usersData = database.collection("usersData"); // Access the 'usersData' collection

    // Route to fetch all users
    app.get("/users", async (req, res) => {
      const findResult = usersData.find(); // Find all documents in the 'usersData' collection
      const result = await findResult.toArray(); // Convert the result to an array
      res.send(result); // Send the result back as the response
    });

    // Route to add a new user
    app.post("/adduser", async (req, res) => {
      const user = req.body; // Extract the user data from the request body
      console.log(user); // Log the user data to the console
      const result = await usersData.insertOne(user); // Insert the user data into the 'usersData' collection
      res.send(result); // Send the result back as the response
    });

    // Route to delete a user by ID
    app.delete("/user/delete/:id", async (req, res) => {
      const id = req.params.id; // Extract the user ID from the request parameters
      console.log("Please delete user of id", id); // Log the ID of the user to be deleted
      const result = await usersData.deleteOne({ _id: new ObjectId(id) }); // Delete the user with the specified ID
      res.send(result); // Send the result back as the response
    });

    // Route to find a user by ID
    app.get("/user/update/:id", async (req, res) => {
      const id = req.params.id; // Extract the user ID from the request parameters
      const findResult = usersData.find({ _id: new ObjectId(id) }); // Find the user with the specified ID
      const result = await findResult.toArray(); // Convert the result to an array
      res.send(result); // Send the result back as the response
    });

    // Route to update a user by ID
    app.put("/user/update/:id", async (req, res) => {
      const id = req.params.id; // Extract the user ID from the request parameters
      const updateUserInfo = req.body; // Extract the updated user information from the request body

      const query = { _id: new ObjectId(id) }; // Define the query to find the user by ID
      const options = { upsert: true }; // Set the options for the update operation to allow upsert
      const update = {
        $set: {
          name: updateUserInfo.name, // Update the user's name
          email: updateUserInfo.email, // Update the user's email
        },
      };
      const result = usersData.updateOne(query, update, options); // Update the user's information
      res.send(result); // Send the result back as the response
    });

    // Send a ping to confirm a successful connection to MongoDB
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("An error occurred:", error);
  } finally {
    // Close the MongoDB client connection when done
    // await client.close();
  }
}

// Run the MongoDB operations
run().catch(console.dir);

// Default route to check server status
app.get("/", (req, res) => {
  res.send("Server is running..."); // Send a simple message indicating the server is running
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log("Server is running on port", port); // Log the message when the server starts running
});
