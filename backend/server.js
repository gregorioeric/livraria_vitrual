import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clientRoute from "./src/routes/clientRoute.js";

dotenv.config();

const PORT = process.env.PORT_SERVER || 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/client", clientRoute);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
