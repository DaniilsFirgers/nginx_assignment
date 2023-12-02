// Importing the express module
const express = require("express");
const expressWs = require("express-ws");
const path = require("path");

// Creating an instance of express
const app = express();
app.use(express.static(path.join(__dirname, "static")));
expressWs(app);

const serverName = "back-up";
// Define a route
app.get("/", (req, res) => {
  res.send({ status: "ok", message: `Hello World from ${serverName} server!` });
});

app.get("*", function (req, res) {
  console.error(`404: ${req.originalUrl}`);
  res.sendFile(path.join(__dirname, "static", "custom_404.html"));
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

// Set up the server to listen on port 4002
const port = 4002;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
