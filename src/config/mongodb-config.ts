
import {config} from "dotenv";

config({path: "environments/.env"});
const mongoUri = process.env.mongoURI ?? ''

//const mongoUri = 'mongodb+srv://devapriyakodinjoor24:Capricon22@cluster0.mxozqza.mongodb.net/?retryWrites=true&w=majority';

export default mongoUri;
