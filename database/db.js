const {Client} = require ('pg');

const client = new Client({
	host:'localhost',
	database:'test',
	port:5432,
	username:'postgres',
	password:'Yash2003@'
})