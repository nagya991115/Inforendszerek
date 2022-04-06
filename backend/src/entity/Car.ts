import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Trips } from "./Trips";

@Entity()
export class Car {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'text' })
    rendszam: string;

    @Column({ nullable: true, type: 'text' })
    tipus: string;

    @Column({ nullable: true, type: 'text' })
    uzemanyag: string;

    @Column({ nullable: true, type: 'float'})
    fogyasztas : number;

    @Column({ nullable: true, type: 'int'})
    kmoraallas : number;

    @OneToMany(type => Trips, trip =>trip.auto)
    utak : Trips[];

}
