import { createConnection, getManager } from "typeorm";
import { faker } from "@faker-js/faker";
import { Order } from "../entity/order.entity";
import { OrderItem } from "../entity/order-item.entity";

createConnection().then(async (connection) => {
  const orderRepository = getManager().getRepository(Order);
  const orderItemRepository = getManager().getRepository(OrderItem);

  for (let i = 0; i < 30; i++) {
    const order = await orderRepository.save({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      created_at: faker.date.past(2).toISOString()
    });

    const random = Math.floor(1 + Math.random() * (5 - 1 + 1)); // 10-100
    for (let j = 0; j < random; j++) {
      await orderItemRepository.save({
        order,
        product_title: faker.lorem.words(2),
        price: Math.floor(10 + Math.random() * (100 - 10 + 1)), // 10-100
        quantity: Math.floor(1 + Math.random() * (5 - 1 + 1)), // 1-5
      });
    }
  }
});

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}