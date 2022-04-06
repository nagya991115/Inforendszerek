import {Entity, PrimaryGeneratedColumn, Column,ManyToOne} from "typeorm";
import { Car } from "./Car";
import { Drivers } from "./Drivers";

@Entity()
export class Trips {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Car, {
        eager: true,
        cascade: true
    })
    auto: Car;

    @ManyToOne(type => Drivers, {
        eager: true,
        cascade: true
    })
    sofor : Drivers;

    @Column({ nullable: true, type: 'date'})
    utazas_ideje : Date;

    @Column({nullable : true, type : 'text'})
    utazas_jellege : string;

    @Column({nullable : true, type : 'text'})
    indulas_helye : string;

    @Column({nullable : true, type : 'text'})
    erkezes_helye : string;

    @Column({nullable : true, type : 'float'})
    megtett_tavolsag : number;
    
    @Column({nullable : true, type : 'float'})
    auto_kmallas  : number;


}
