import { environment } from "../../../src/environments/environment";

export const baseUrl = environment.apiUrl+'/api/v1';
export const vehiclesUrl = baseUrl+'/vehicles';
export const ownersUrl = baseUrl+'/owners';
export const login = baseUrl+'/identity/login';
export const refreshTokenPath = baseUrl+'/identity/refresh';
export const getUserName = baseUrl+'/identity/get-user';

export const chatUrl = baseUrl+'/chat';
