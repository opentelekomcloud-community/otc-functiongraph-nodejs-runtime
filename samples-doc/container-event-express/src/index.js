"use strict";

const express = require("express");
const { loggingMiddleware } = require("./loggingmiddleware");

const PORT = 8000;

const app = express();
app.use(express.json());
app.use(loggingMiddleware);

// Optional function initialization entry
app.post("/init", (req, res) => {
  const logger = req.logger; 
  logger.info("Function initialization");
  // Perform initialization operations here
  res.json({ message: "Initialization completed" });
});

// Function execution entry
app.post("/invoke", (req, res) => {
  const event = req.body;
  const logger = req.logger; 

  logger.info("Received event:", event);

  logger.info("Processing event with request ID:", req.cffRequestId);

  // If enable_auth_in_header is set to true, you can access the security credentials from the request headers
  const ak = req.header("x-cff-security-access-key") || "No Access Key provided -> enable_auth_in_header";
  const sk = req.header("x-cff-security-secret-key");
  const st = req.header("x-cff-security-token");
  logger.info("Security Access Key:", ak);

  // Process the event and generate a response
  const response = {
    message: "Event processed successfully",
    inputEvent: event,
  };
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
