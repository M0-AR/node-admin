import { Request, Response } from "express";
import { Parser } from "json2csv";
import { getManager } from "typeorm";
import { OrderItem } from "../entity/order-item.entity";
import { Order } from "../entity/order.entity";

export const Orders = async (req: Request, res: Response) => {
  const take = 15;
  const currentPage = parseInt((req.query.page as string) || "1");

  const repository = getManager().getRepository(Order);

  const [data, total] = await repository.findAndCount({
    take,
    skip: (currentPage - 1) * take,
    relations: ["order_items"],
  });

  res.send({
    data: data.map((order: Order) => ({
      id: order.id,
      name: order.name,
      email: order.email,
      total: order.total,
      created_at: order.created_at,
      order_items: order.order_items,
    })),
    meta: {
      total,
      currentPage,
      last_page: Math.ceil(total / take),
    },
  });
};

export const Export = async (req: Request, res: Response) => {
  const parser = new Parser({
    fields: ["ID", "Name", "Email", "Product Title", "Price", "Quantity"],
  });

  const repository = getManager().getRepository(Order);

  const orders = await repository.find({ relations: ["order_items"] });

  const json: any[] = [];

  orders.forEach((order: Order) => {
    json.push({
      ID: order.id,
      Name: order.name,
      Email: order.email,
      "Product Title": "",
      Price: "",
      Quantity: "",
    });

    order.order_items.forEach((item: OrderItem) => {
      json.push({
        ID: "",
        Name: "",
        Email: "",
        "Product Title": item.product_title,
        Price: item.price,
        Quantity: item.quantity,
      });
    });
  });

  const csv = parser.parse(json);

  res.header("Content-Type", "text/csv");
  res.attachment("orders.csv");
  res.send(csv);
};

export const Chart = async (req: Request, res: Response) => {
  const manger = getManager();

  const result = await manger.query(`
      SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, 
        SUM(oi.price * oi.quantity) as sum
        FROM \`order\` o
        JOIN order_item oi on o.id = oi.order_id
        GROUP BY date 
  `);

  res.send(result);
};
