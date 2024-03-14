import mysql from 'mysql2/promise';

export default async function conectar(){
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root', //jamais faça isso
            password:'',  //never, nunca, jamais
            database: 'sistemagestao',
            waitForConnections: true,
            connectionLimit: 2000000,
            maxIdle: 20000000, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 2000000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
          });

          global.poolConexoes = pool;
          return await pool.getConnection();
    }
}