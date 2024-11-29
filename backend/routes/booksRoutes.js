import express from 'express';
import { Book } from '../models/bookModels.js';

const router = express.Router();

// Route for Save a new book
  router.post('/', async (request, response) => {
      try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) 
          {
          return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear',
          });
        }
          // Creating "book"  
          const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
          };
          // Object
            const book = await Book.create(newBook);
          return response.status(201).send(book);
          
      } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
      }
    }); 

// Route to Get all books from database
  router.get('/',  async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
          count: books.length,
          data: books
        });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });

// Route to Get One book from database by id
  router.get('/:id',  async (request, response) => {
    try {
      // getting id from parameters
      const { id } = request.params;
      // findById
      const book = await Book.findById(id);
      // returning the book in JSON
      return response.status(200).json(book);
    } 
    catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message});
    }
  });
 
// Route for Update a Book
  router.put('/:id',  async (request, response) => {
    try {
      // Check if Given data "CORRECT"
          if ( !request.body.title || !request.body.author || !request.body.publishYear )
              {
                return response.status(400).send({
                  message: 'Send all required fields: title, author, publishYear',
                });
              }
      // if "CORRECT"          
      const { id } = request.params;
      // findByIdAndUpdate
      const result = await Book.findByIdAndUpdate(id, request.body);
      
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }     
                      
      return response.status(200).send({ message: 'Book updated Successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message});
  }
  });

// Route for Delete a Book
  router.delete('/:id',  async (request, response) => {
    try {
      // getting id from parameters
      const { id } = request.params;
      // findByIdAndDelete
      const result = await Book.findByIdAndDelete(id);
      
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }

      return response.status(200).send({ message:'Book Deleted Successfully' }) 
    } 
    catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message});
    }
  });

  export default router;