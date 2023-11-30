// Importing the express module
const express = require("express");
const expressWs = require("express-ws");

// Creating an instance of express
const app = express();
expressWs(app);

const serverName = "main";
// Define a route
app.get("/", (req, res) => {
  res.send({ status: "ok", message: `Hello World from ${serverName} server!` });
});

app.ws("/ws", (ws, req) => {
  console.log(`WebSocket  for "${serverName}" connection established`);

  ws.on("message", (message) => {
    console.log(`Server "${serverName}" received message: ${message}`);

    // Send a response back to the client
    ws.send(`Server "${serverName}" received your message: ${message}`);
  });

  ws.on("close", () => {
    console.log(`WebSocket for "${serverName}" connection closed`);
  });
});

// Set up the server to listen on port 4000
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
