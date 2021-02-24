export class AuthResponseData {

  public id: number;
  public email: string;
  public roles : []
  public pseudo: string;
  public token: string;

  constructor(id: number, email: string, roles: [], pseudo: string, token: string){
      this.id = id;
      this.email = email;
      this.roles = roles;
      this.pseudo = pseudo;
      this.token = token;
  }
}
