import { Request, Response } from "express";
import { getManager } from "typeorm";
import { RegisterValidation } from "../validation/register.validation";
import { User } from "../entity/user.entity";
import bcyptjs from "bcryptjs";
import { sign } from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {
  const body = req.body;

  const { error } = RegisterValidation.validate(body);

  if (error) {
    return res.status(400).send(error.details);
  }

  if (body.password !== body.password_confirm) {
    return res.status(400).send({
      message: "Passwords do not match",
    });
  }

  const repository = getManager().getRepository(User);

  const { password, ...user } = await repository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcyptjs.hash(body.password, 10),
  });

  res.send(user);
};

export const Login = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  const user = await repository.findOne({ where: { email: req.body.email } });

  if (!user) {
    return res.status(400).send({
      message: "invalid credentials!",
    });
  }

  if (!(await bcyptjs.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: "invalid credentials!",
    });
  }

  const token = sign({ id: user.id }, "secret");

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1day
  });

  res.send({
    message: "success",
  });
};
