import express, { Request, Response } from "express";
import { login, register, bouncer } from "./controllers/authController.js";
import mongoose from "mongoose";
import { DB_URI } from "./config/config";
import cors from "cors";
import { getEmail } from "./controllers/userController.js";

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(DB_URI)
  .then((result) => {
    console.log("connected to Mongo DB");
    app.listen(process.env.PORT || 5000, () => console.log(`server listening`));
  })
  .catch((err) => console.log(err));

app.get("/test", (req: Request, res: Response) => {
  return res.send("test ok");
});

app.post("/auth/register", register);
app.post("/auth/login", login);

app.use(bouncer);

app.get("/email", getEmail);
