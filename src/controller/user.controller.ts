import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import bcyptjs from "bcryptjs";

export const Users = async (req: Request, res: Response) => {
  const take = 15;
  const currentPage = parseInt((req.query.page as string) || "1");

  const repository = getManager().getRepository(User);

  const[data, total] = await repository.findAndCount({
    take,
    skip: (currentPage - 1) * take,
    relations: ["role"]
  });

  res.send({
    data: data.map((user) => {
      const { password, ...data } = user;

      return data;
    }),
    meta: {
      total,
      currentPage,
      last_page: Math.ceil(total / take),
    },
  });
};

export const CreateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const hashedPassword = await bcyptjs.hash("1234", 10); // Defualt password for every user created by the admin

  const repository = getManager().getRepository(User);

  const { password, ...user } = await repository.save({
    ...body,
    password: hashedPassword,
    role: {
      id: role_id,
    },
  });

  res.status(201).send(user);
};

export const GetUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  const { password, ...user } = (await repository.findOne({
    where: { id: Number(req.params.id) },
    relations: ["role"],
  })) ?? {
    user: "not found",
  };

  res.send(user);
};

export const UpdateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;

  const repository = getManager().getRepository(User);

  await repository.update(req.params, {
    ...body,
    role: {
      id: role_id
    }
  });

  const { password, ...user } = (await repository.findOne({
    where: { id: Number(req.params.id) },
    relations: ["role"],
  })) ?? {
    user: "not found",
  };

  res.status(202).send(user);
};

export const DeleteUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  await repository.delete(req.params);

  res.status(204).send(null);
};