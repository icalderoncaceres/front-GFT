/**
 * User Interfaces
 * Define la estructura de los usuarios, se colocan dos campos opcionales ya que al ser utilizado en el login no se utilizan
 */

export interface User {
    email: string;
    password: string;
    firstname?: string,
    lastname?: string
}