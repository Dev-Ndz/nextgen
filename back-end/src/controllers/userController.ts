import { Request, Response } from "express";

export const getEmail = async (req: any, res: Response) => {
  let email = req.user.email;
  return res.send({ email });
};
