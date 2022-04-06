import { getRepository } from "typeorm";
import { Trips } from "../entity/Trips";
import { Controller } from "./controller";

export class TripsController extends Controller {
    repository = getRepository(Trips);

    getAll = async (req, res) => {
        try {
            const entities = await this.repository
                .createQueryBuilder('trips')
                .leftJoinAndSelect('trips.auto','auto')
                .leftJoinAndSelect('trips.sofor','sofor')
                .orderBy('trips.utazas_ideje','ASC')
                .getMany();
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }

    getAllFiltered = async (req, res) => {
        const datum = req.query.datum || '';
        const rendszam = req.query.rendszam || '';

        try {
            const entities = await this.repository
                .createQueryBuilder('trips')
                .where("(trips.utazas_ideje like CONCAT('%', :search, '%')) and (trips.auto.id = :search2)", { search: datum, search2 : rendszam})
                .leftJoinAndSelect('trips.auto','auto')
                .leftJoinAndSelect('trips.sofor','sofor')
                .orderBy('trips.utazas_ideje','ASC')
                .getMany();
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }

    getAllSpecifiedTrip = async (req, res) => {
        const datum = req.query.datum || '';
        const rendszam = req.query.rendszam || '';
        const type = req.query.type || '';

        try {
            const entities = await this.repository
                .createQueryBuilder('trips')
                .where("(trips.utazas_ideje like CONCAT('%', :search, '%')) and (trips.auto.id = :search2) and (trips.utazas_jellege like CONCAT('%', :search3, '%'))", { search: datum, search2 : rendszam, search3 : type})
                .leftJoinAndSelect('trips.auto','auto')
                .leftJoinAndSelect('trips.sofor','sofor')
                .orderBy('trips.utazas_ideje','ASC')
                .getMany();
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }

    getAllWhereDateLowerThan = async (req, res) => {
        const datum = req.query.datum || '';
        const rendszam = req.query.rendszam || '';

        try {
            const entities = await this.repository
                .createQueryBuilder('trips')
                .where("(trips.utazas_ideje < :search and (trips.auto.id = :search2))", { search: datum, search2 : rendszam})
                .leftJoinAndSelect('trips.auto','auto')
                .leftJoinAndSelect('trips.sofor','sofor')
                .orderBy('trips.utazas_ideje','ASC')
                .getMany();
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }

    getAllWhereDateGreaterThan = async (req, res) => {
        const datum = req.query.datum || '';
        const rendszam = req.query.rendszam || '';

        try {
            const entities = await this.repository
                .createQueryBuilder('trips')
                .where("(trips.utazas_ideje > :search and (trips.auto.id = :search2))", { search: datum, search2 : rendszam})
                .leftJoinAndSelect('trips.auto','auto')
                .leftJoinAndSelect('trips.sofor','sofor')
                .orderBy('trips.utazas_ideje','ASC')
                .getMany();
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }


  
}