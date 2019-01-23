/**
 * Session Interfaces
 * Define la estructura del objeto que se guardara en el storage con los datos del usuario que inicio sessión
 */

export interface SessionData {
    email: string;
    password: string;
    firstname: string,
    lastname: string,
    id: string,
    token: string
}