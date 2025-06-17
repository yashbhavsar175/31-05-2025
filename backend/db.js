import 'dotenv/config';
import {Client} from 'pg';

const conn = new Client({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port:5432,
  user: process.env.DB_USER,
  password:process.env.DB_PASSWORD
});

conn.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Connection error', err.message))


  export default conn;
  