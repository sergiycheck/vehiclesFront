
export const whiteListDomains ='localhost:5011';

export const baseApiRoute = 'https://'+whiteListDomains;

export const baseUrl = baseApiRoute+'/api/v1';
export const vehiclesUrl = baseUrl+'/vehicles';
export const ownersUrl = baseUrl+'/owners';
export const getOwnerByUniqueNumber = ownersUrl+'/vehicle-unique-number/{uniqueNumber}';


export const login = baseUrl+'/identity/login';



export const register = baseUrl+'/identity/register';


export const refreshTokenPath = baseUrl+'/identity/refresh';
export const getUserName = baseUrl+'/identity/get-user';

export const chatUrl = baseUrl+'/chat';

export const getVehiclesByOwner = vehiclesUrl+'/get_cars_by_owner';
export const getVehiclesImg = vehiclesUrl + 'getImage/{name}';


export const  GetAllPenalties = baseUrl + "/penalties";
export const  GetPenaltiesByUniqueNumber = GetAllPenalties + "/vehicle-unique-number/{uniqueNumber}";

export const  GetPenaltiesByUserId = GetAllPenalties + "/get-by-user/{userId}";

export const  GetPenalty = GetAllPenalties + "/{id:int}";

export const  CreatePenalty = GetAllPenalties + "/create";
export const  UpdatePenalty = GetAllPenalties + "/update/{id:int}";
export const  DeletePenalty = GetAllPenalties + "/delete/{id:int}";

export const  PayPenalty = GetAllPenalties + "/pay/{id:int}";



