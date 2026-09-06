const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Example HTTP Function: Hello World
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase Cloud Functions!");
});

// Example Callable Function: process data securely
exports.processData = functions.https.onCall((data, context) => {
  // Ensure the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  // Your logic here
  const result = `Processed data: ${data.text}`;
  return { result };
});
