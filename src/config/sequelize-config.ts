import {Sequelize} from 'sequelize';

const sequelize = new Sequelize({
  username: 'root',
  host: '127.0.0.1',
  database: 'ecommerce',
  dialect:'mysql',
  port: 3306,
  password: 'experion@123',
});

export default sequelize;

