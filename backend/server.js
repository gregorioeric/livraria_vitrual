import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import clientRoute from "./src/routes/clientRoute.js";
import userRouter from "./src/routes/userRoute.js";
import loginRoute from "./src/routes/loginRoute.js";
import uploadRoute from "./src/routes/uploadRoute.js";
import enderecoRouter from "./src/routes/enderecoRoute.js";

dotenv.config();

const PORT = process.env.PORT_SERVER || 8000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // obrigatório para cookies funcionarem
  }),
);
app.use(cookieParser());

app.use("/client", clientRoute);
app.use("/users", userRouter);
app.use("/auth", loginRoute);
app.use("/upload", uploadRoute);
app.use("/endereco", enderecoRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
