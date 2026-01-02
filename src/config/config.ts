import dotenv from 'dotenv';

dotenv.config();

interface DBConfig {
  host: string;
  port?: string;
  name: string;
  user: string;
  pass: string;
  url: string;
}

interface Config {
  port: number;
  nodeEnv: string;
  db?: DBConfig;
}

const config: Config = {
  port: Number(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    name: process.env.DB_NAME || "mydb",
    user: process.env.DB_USER || "root",
    pass: process.env.DB_PASS || "password",
    url: `mongodb://root:password@127.0.0.1:27017/mydb?authSource=admin&replicaSet=rs0&directConnection=true&tls=false`
      // : `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
  }
};

export default config;