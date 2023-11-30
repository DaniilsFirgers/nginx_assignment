import fetch from "node-fetch"; // Import the 'node-fetch' module
import https from "https"; // Import the 'https' module

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

async function makeRequests() {
  for (let i = 1; i <= 9; i++) {
    try {
      const response = await fetch("https://localhost:8080", {
        agent: httpsAgent,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(`Request ${i} Response:`, data);
      } else {
        console.error(
          `Request ${i} Error:`,
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Request ${i} failed:`, error);
    }
  }
}

makeRequests();
