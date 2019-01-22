const ENVIRONMENT = true; //true=production

export const SERVER_ENDPOINTS = {
    AUTH_USER_CREATE: 'auth/user/create',
    AUTH_USER_AUTHENTICATE: 'auth/user/authenticate',
    ACCOUNTS: 'accounts/',
    CATALOGS_CARDS: 'catalogs/cards/'
};


const SERVER_URL_PROD = ' https://mighty-refuge-81707.herokuapp.com/api/';
const SERVER_URL_STG = ' https://mighty-refuge-81707.herokuapp.com/api/';

export const SERVER_URL = (ENVIRONMENT) ? SERVER_URL_PROD : SERVER_URL_STG;
export const ENV = (ENVIRONMENT) ? "prod" : "stg";
