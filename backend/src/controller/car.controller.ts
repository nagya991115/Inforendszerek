import { getRepository } from "typeorm";
import { Car } from "../entity/Car";
import { Controller } from "./controller";

export class CarController extends Controller {
    repository = getRepository(Car);

    getAll = async (req, res) => {
        const search = req.query.search || '';

        try {
            const entities = await this.repository
                .createQueryBuilder('car')
                .where("car.rendszam LIKE CONCAT('%', :search, '%')", { search: search })
                .getMany();
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }
}