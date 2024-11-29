import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
// import { Book } from "./models/bookModels.js";
import booksRoute from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json()); 

// Middleware for handling CORS policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors());
// Option 2: Allow custom origins 
// app.use(
//   cors({
//     origin:'http://localhost:3000',
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-type'],
//   })
// ); 

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send(`Welcome to MERN Project`);
});
  
app.use('/books', booksRoute);

mongoose 
  .connect(mongoDBURL)
  .then(() => {
    console.log(`Kam thay gyu!`);
   app.listen(PORT, () => {
      console.log(`Port Chalu, port No: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
