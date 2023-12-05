import http from "http"
import { Server } from "socket.io"
const server = http.createServer((req, res) => {
  // Handle HTTP requests if needed
})

const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
})

io.on("connection", (socket) => {
  console.log("A user connected")

  // Handle chat messages
  socket.on("floor-selected", (message) => {
    console.log(message)
    io.emit("floor-selected", message) // Broadcast the message to all connected clients
  })

  socket.on("floor-number", (floorNumber) => {
    io.emit("floor-number", floorNumber) // Broadcast the message to all connected clients
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected")
  })
})

server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001")
})
