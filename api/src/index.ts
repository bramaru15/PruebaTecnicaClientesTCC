import express, { Application } from "express";
import morgan from "morgan";
import Router from "./routes";
import 'dotenv/config';
import cors from "cors";
 


const PORT = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:4200'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const app: Application = express();

app.use(cors(options));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use('/api', Router);


app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});