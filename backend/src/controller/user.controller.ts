import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Controller } from "./controller";

export class UserController extends Controller {
    repository = getRepository(User);

    getUserRole = async (req, res) => {
        const username = req.query.username || '';
        const password = req.query.password || '';
        
        try {
            const entity = await this.repository
                .createQueryBuilder('user')
                .where('user.username = :username AND user.password = :password', {username: username, password: password})
                .getOne();
            if (entity) {
                res.json(entity.role);
            } else {
                res.json('');
            }
            
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }
}