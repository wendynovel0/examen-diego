import express from "express";
import notificationRoutes from "./routes/notification.routes";

const app = express();
app.use(express.json());
app.use("/notifications", notificationRoutes);
app.listen(3005, () => console.log("Notification Service running on 3005"));
