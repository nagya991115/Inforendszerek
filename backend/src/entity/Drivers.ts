import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Trips } from "./Trips";

@Entity()
export class Drivers {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'text' })
    nev: string;

    @Column({ nullable: true, type: 'date' })
    szulido: Date;

    @Column({ nullable: true, type: 'text' })
    lakcim: string;

    @Column({ nullable: true, type: 'text'})
    jogositvany_szama : string;

    @Column({ nullable: true, type: 'date'})
    jogositvany_ervenyesseg : Date;

    @OneToMany(type => Trips, trip =>trip.sofor)
    utazasok : Trips[];
}
