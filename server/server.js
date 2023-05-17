const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 5000;
const mongoURI = "mongodb://localhost:27017/minimumpossible";

app.use(express.json());

// Define the route
app.post("/minimum-possible", async (req, res) => {
  try {
    const { input, output } = req.body;

    // Connect to MongoDB
    const client = await MongoClient.connect(mongoURI);
    const db = client.db();

    // Save the fields to the database
    const collection = db.collection("results");
    await collection.insertOne({ input, output });

    // Close the MongoDB connection
    client.close();

    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
