import { Request, Response } from "express";
import { getManager } from "typeorm";
import {Role} from "../entity/role.entity"

export const Roles = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);

  res.send(await repository.find());
}; 

export const CreateRole = async (req: Request, res: Response) => {
  const {name, permissions} = req.body;

  const repository = getManager().getRepository(Role);

  const role = await repository.save({
    name: name,
    permissions: permissions.map((id: number) => ({id}))
  });

  res.send(role);
}; 

export const GetRole = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);

  const role = (await repository.findOne({
    where: { id: Number(req.params.id) },
    relations: ["permissions"],
  })) ?? {
    user: "not found",
  };

  res.status(201).send(role);
}

export const UpdateRole = async (req: Request, res: Response) => {
  const {name, permissions} = req.body;

  const repository = getManager().getRepository(Role);

  const role = await repository.save({
    id: parseInt(req.params.id),
    name: name,
    permissions: permissions.map((id: number) => ({id}))
  });

  res.status(202).send(role);
}

export const DeleteRole = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);

  await repository.delete(req.params.id);

  res.status(204).send(null);
}