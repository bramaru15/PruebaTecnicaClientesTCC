import { Request, Response } from "express";
import { Connection } from "../database/Connection";

export default class ClientController {

  public async getClients(request: Request, response: Response) {
    try {
      
      const connection = new Connection();

      const clients = connection.execute('Cliente_Get_List'); 
      
      response.json({ status: 200, clients: clients });

    } catch (error) {
      throw new Error("Failed to get clients");
    }
  }

  public async getClientById(request: Request, response: Response) {
    try {
      
      const { id } = request.params;

      response.json({ status: 200, data: {} });

    } catch (error) {
      throw new Error("Failed to get client");
    }
  }

  public async createClient(request: Request, response: Response){
    try {

      response.status(201).json({ data: {} });

    } catch (error) {
      throw new Error("Failed to create new client");
    }
  }

  public async updateClient(request: Request, response: Response){
    try {
     
      response.status(200).json({ data: {} });

    } catch (error) {
      throw new Error("Failed to update client");
    }
  }

  public async deleteClientById(request: Request, response: Response){
    try {
     
      response.status(200).json({ data: {} });

    } catch (error) {
      throw new Error("Failed to delete client");
    }
  }

}