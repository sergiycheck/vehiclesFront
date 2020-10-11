import { environment } from "../../../src/environments/environment";

export const baseUrl = environment.apiUrl+'/api/v1';
export const vehiclesUrl = baseUrl+'/vehicles';
export const ownersUrl = baseUrl+'/owners';
