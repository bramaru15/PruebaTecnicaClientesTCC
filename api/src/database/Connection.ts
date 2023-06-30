import * as sql from 'mssql'
import 'dotenv/config'

import { IParameter } from '../interfaces/IParameter';

export const config: sql.config = {
  server: process.env.DB_HOST || '',
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  }
};

export class Connection {

  public config: sql.config

  constructor(){
    this.config = config;
  }

  execute(procedure: string, params: IParameter[] = []): Promise<any>{
    return new Promise(async(resolve, reject) => {

      let pool!: sql.ConnectionPool;

      try {
        pool = await new sql.ConnectionPool(this.config).connect();
      } catch (error) {
        console.log(error);
        return;
      }

      try {
        const request = pool.request();

        params.forEach((param) => {
          request.input(param.name, param.type, param.value)
        })

        const { returnValue, recordset } = await request.execute(procedure);
        
        if(returnValue === 0){
            resolve(recordset);
        }
      } catch (error) {
        reject(new Error('No se pudo'));
      } finally {
        if(pool && typeof pool.close == 'function'){
          pool.close();
        }
      }
    })
  }

}


   

