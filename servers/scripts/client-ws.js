import WebSocket from "ws";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const ws = new WebSocket("wss://localhost:8080/ws", { agent: httpsAgent });
let messageInterval;

ws.addEventListener("open", async (event) => {
  console.log("WebSocket connection opened");
  await new Promise((res, rej) => {
    for (let i = 1; i <= 5; i++) {
      sendMessage();
    }
    res();
  });
  ws.close();
});

ws.addEventListener("message", (event) => {
  console.log(`Message from server: ${event.data}`);
});

ws.addEventListener("close", (event) => {
  console.log("WebSocket connection closed");
  clearInterval(messageInterval);
});

function sendMessage() {
  const message = "Hello, Server!";
  ws.send(message);
}
