import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Product } from "../entity/product.entity";

export const Products = async (req: Request, res: Response) => {
  const take = 15;
  const currentPage = parseInt((req.query.page as string) || "1");

  const repository = getManager().getRepository(Product);

  const [data, total] = await repository.findAndCount({
    take,
    skip: (currentPage - 1) * take,
  });

  res.send({
    data,
    meta: {
      total,
      currentPage,
      last_page: Math.ceil(total / take),
    },
  });
};

export const CreateProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);

  const product = await repository.save(req.body);

  res.status(201).send(product);
};

export const GetProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);

  const product = (await repository.findOne({
    where: { id: Number(req.params.id) },
  })) ?? {
    user: "not found",
  };

  res.send(product);
};

export const UpdateProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);

  await repository.update(req.params, req.body);

  const product = (await repository.findOne({
    where: { id: Number(req.params.id) },
  })) ?? {
    user: "not found",
  };

  res.status(202).send(product);
};

export const DeleteProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);

  await repository.delete(req.params);

  res.status(204).send(null);
};
