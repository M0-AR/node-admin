import {createConnection, getManager} from "typeorm";
import { Product } from "../entity/product.entity";
import {faker} from '@faker-js/faker';

createConnection().then(async connection => {
    const repository = getManager().getRepository(Product);

    for (let i = 0; i < 30; i++) {
        await repository.save({
          title: faker.lorem.words(2),
          description: faker.lorem.words(20),
          image: faker.image.imageUrl(200, 200, "", true),
          price: Math.floor(10 + Math.random() * (100 - 10 + 1)) // 10-100
        });
    }

});