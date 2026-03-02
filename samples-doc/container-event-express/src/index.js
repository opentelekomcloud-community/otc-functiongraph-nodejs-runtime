"use strict";

const express = require("express");

const PORT = 8000;

const app = express();
app.use(express.json());

// Optional function initialization entry
app.post("/init", (req, res) => {
  console.log("Function initialization");
  // Perform initialization operations here
  res.json({ message: "Initialization completed" });
});

// Function execution entry
app.post("/invoke", (req, res) => {
  const event = req.body;
     console.log('Received event:', event);
     // Process the event and generate a response
     const response = {
       message: 'Event processed successfully',
       inputEvent: event,
     };
     res.json(response);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
