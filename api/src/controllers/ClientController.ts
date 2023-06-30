import { Request, Response } from "express";
import { Connection } from "../database/Connection";
import { IParameter } from "../interfaces/IParameter";
import * as sql from 'mssql';
import * as yup from 'yup';

export default class ClientController {

  public async getClients(request: Request, response: Response) {
    try {
      const connection = new Connection();
      const clients = await connection.execute('Cliente_Get_List');

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
      const createClientEsq = yup.object({
        document: yup.string().required().max(100).min(10),
        name: yup.string().required().max(150).min(5),
        documentType: yup.number().required(),
        genre: yup.string().required()     
      });   
      const { document, name, documentType, genre } = request.body;
      try {
        await createClientEsq.validate(request.body)
      }catch(error){
        return response.status(400).send({ mensaje: error });
      }

      try {
      const parametros : IParameter[] =[
      {
        name: 'document',
        type: sql.VarChar,
        value: document
      },
      {
        name: 'name',
        type: sql.VarChar,
        value: name
      },
      { 
        name: 'documentType',
        type: sql.Int,
        value: documentType
      }, 
      {
        name: 'genre',
        type: sql.VarChar,
        value: genre
      }  
      ]

      const connection = new Connection();
      const resultado = await connection.execute('Cliente_Insert', parametros);
      response.json({ status: 200, mensaje: "OK" });
    } catch (error) {
      throw new Error("Failed to create new client");
    }
  }

  public async updateClient(request: Request, response: Response){
      const updateClientEsq = yup.object({
        document: yup.string().required().max(100).min(10),
        name: yup.string().required().max(150).min(5),
        documentType: yup.number().required(),
        genre: yup.string().required()     
      });   
      const { document, name, documentType, genre } = request.body;
      try {
        await updateClientEsq.validate(request.body)
      }catch(error){
        return response.status(400).send({ mensaje: error });
      }

      try {
      const parametros : IParameter[] =[
      {
        name: 'document',
        type: sql.VarChar,
        value: document
      },
      {
        name: 'name',
        type: sql.VarChar,
        value: name
      },
      { 
        name: 'documentType',
        type: sql.Int,
        value: documentType
      }, 
      {
        name: 'genre',
        type: sql.VarChar,
        value: genre
      }  
      ]

      const connection = new Connection();
      const resultado = await connection.execute('Cliente_Update', parametros);
      response.json({ status: 200, mensaje: "OK" });

    } catch (error) {
      throw new Error("Failed to update client");
    }
  }

  public async deleteClientById(request: Request, response: Response){
    try {
      const connection = new Connection();
      const { id } = request.params;

      const parametros: IParameter[] = [
        {
          name: 'document',
          type: sql.VarChar,
          value: id
        }
      ]

      const resultado = await connection.execute('Cliente_Delete', parametros);
      response.json({ status: 200,  mensaje: "OK" });

    } catch (error) {
      throw new Error("Failed to delete client");
    }
  }

}