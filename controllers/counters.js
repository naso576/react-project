const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("projectnktd");
    const movies = database.collection("patients_profiles");
    
   // const estimate = await movies.countDocuments();
  //  console.log(`Estimated number of documents in the movies collection: ${estimate}`);
    /* Print the number of documents in the "movies" collection that
    match the specified query */
    const query = {};
    const countCanada = await movies.countDocuments({});
    console.log(`Number of movies from Canada: ${countCanada}`);
  } finally {
    // Close the connection after the operations complete
    await client.close();
  }
}
// Run the program and print any thrown exceptions
run().catch(console.dir);