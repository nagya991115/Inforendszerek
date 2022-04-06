import { Car } from "./car";
import { Driver } from "./driver";

export interface Trip{
    id : string,
    auto : Car,
    sofor : Driver,
    utazas_ideje : string,
    utazas_jellege : string,
    indulas_helye : string,
    erkezes_helye : string,
    megtett_tavolsag : number,
    auto_kmallas : number
}