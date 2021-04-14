
export const baseUrl = 'http://localhost:5010'+'/api/v1';
export const vehiclesUrl = baseUrl+'/vehicles';
export const ownersUrl = baseUrl+'/owners';
export const login = baseUrl+'/identity/login';
export const refreshTokenPath = baseUrl+'/identity/refresh';
export const getUserName = baseUrl+'/identity/get-user';

export const chatUrl = baseUrl+'/chat';

export const getVehiclesByOwner = vehiclesUrl+'/get_cars_by_owner';
export const getVehiclesImg = vehiclesUrl + 'getImage/{name}';


