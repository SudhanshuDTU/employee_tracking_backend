import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
dotenv.config();
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import odometerRoutes from "./routes/odometerRoutes.js";
import shiftRoutes from "./routes/shiftRoutes.js";
import breakRoutes from "./routes/breakRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import warehouseRoutes from "./routes/warehouseRoutes.js"
import pool from "./config/db.js";
import http from 'http'
import {Server} from 'socket.io'

const app = express();
const server = http.createServer(app)
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/odometer", odometerRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/breaks", breakRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/warehouse",warehouseRoutes)


const io = new Server(server,{
    cors:{
        origin: '*',
    }
});
let usersLocation = {};
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    socket.on('sendLocation', (data) => {
      usersLocation[data.userId] = {
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: new Date(),
      };
      io.emit('locationUpdate', { userId: data.userId, ...usersLocation[data.userId] });
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

app.get('/locations',(req,res)=>{
    res.json(usersLocation)
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if(pool){
        console.log("hi from db");
    }
  }); 