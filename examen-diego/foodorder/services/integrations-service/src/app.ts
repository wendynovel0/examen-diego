import express from "express";
import integrationRoutes from "./routes/integration.routes.js";

const app = express();
app.use(express.json());
app.use("/integrations", integrationRoutes);
app.listen(3007, () => console.log("Integrations Service running on 3007"));
