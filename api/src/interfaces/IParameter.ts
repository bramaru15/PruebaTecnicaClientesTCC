import sql from 'mssql'

export interface IParameter {
  name: string
  type: 
    | sql.ISqlTypeFactoryWithLength
    | sql.ISqlTypeFactoryWithNoParams
    | sql.ISqlTypeFactoryWithPrecisionScale
    | sql.ISqlTypeFactoryWithScale
    | sql.ISqlTypeWithTvpType
  value: any
}