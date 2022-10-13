import { Request, Response } from "express";
import { getManager, Repository } from "typeorm";
import { RegisterValidation } from "../validation/register.validation";
import { User } from "../entity/user.entity";
import bcyptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

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

export const AuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const jwt = req.cookies["jwt"];

    const payload: any = verify(jwt, "secret");

    if (!payload) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }

    const repository = getManager().getRepository(User);

    const user = await repository.findOne({ where: { id: payload.id } });

    res.send({
      id: user?.id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
    });
  } catch (e) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
};

export const Logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });

  res.send({
    message: "success",
  });
};
