import express from "express";
import billingRoutes from "./routes/billing.routes.js";

const app = express();
app.use(express.json());
app.use("/billing", billingRoutes);
app.listen(3004, () => console.log("Billing Service running on 3004"));
