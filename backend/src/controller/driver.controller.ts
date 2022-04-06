import { getRepository } from "typeorm";
import { Drivers } from "../entity/Drivers";
import { Controller } from "./controller";

export class DriverController extends Controller {
    repository = getRepository(Drivers);

    getAll = async (req, res) => {
        const search = req.query.search || '';

        try {
            const entities = await this.repository
                .createQueryBuilder('drivers')
                .where("drivers.jogositvany_szama LIKE CONCAT('%', :search, '%')", { search: search })
                .getMany();
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }

    getAllWithOkLicense = async (req, res) => {
        const search = req.query.search || '';

        try {
            const entities = await this.repository
                .createQueryBuilder('drivers')
                .where("drivers.jogositvany_ervenyesseg > :search", { search: search })
                .getMany();
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }
}