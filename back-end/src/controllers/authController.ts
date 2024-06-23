import { Request, Response, NextFunction } from "express";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import JWT, { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ message: "Invalid request : missing email or password" });

  const isEmailAllReadyExist = await User.findOne({ email: email });
  if (isEmailAllReadyExist) {
    return res.status(400).send({
      message: "Email all ready in use",
    });
  }
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: encryptedPassword,
    });
    return res.send({ message: "account created for " + email });
  } catch (error: any) {
    console.log("fail to create user", error);
    return res.status(500).json({ message: error.message.toString() });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({ message: "missing email or password" });

  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .send({ message: "email : " + email + " is not in use" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "wrong password" });
    }
    const token = JWT.sign({ email: user.email }, JWT_SECRET, {
      algorithm: "HS512",
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message.toString() });
  }
};

export const bouncer = async (req: any, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.status(401).send("Unauthorized");

  try {
    let decoded = verify(req.headers.authorization.split(" ")[1], JWT_SECRET);

    if (decoded !== undefined) {
      req.user = decoded;
      return next();
    }
  } catch (err) {
    console.log(err);
  }

  return res.status(403).send("Invalid token");
};
