import { Car } from "./car";

export interface Iowner{
    name:string;
    surName:string;
    patronymic:string;
    phone:string;
    location:string;
    birthDate:Date;
    cars:Car[];
}