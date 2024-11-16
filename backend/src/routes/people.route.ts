import express, { NextFunction, Request, Response } from 'express';
import * as peopleController from '../controllers/people.controller';
import { validatePerson } from '../utils/validations';
import { isCustomError } from '../utils/types';

const router = express.Router();

const validatePersonData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validatePerson(req.body);
    next();
  } catch (error) {
    if (isCustomError(error)) {
      res.status(error.status).json({
        message: error.message,
        errors: error.errors,
      });
    }
  }
};

// Middleware para validar los datos enviados al servidor
router.post('/people', validatePersonData);
router.put('/people', validatePersonData);

// Ruta para crear una persona
router.post('/people', peopleController.createPerson);

// Ruta para obtener todas las personas
router.get('/people', peopleController.getAllPeople);

// Ruta para obtener una persona por ID
router.get('/people/:id', peopleController.getPersonById);

// Ruta para actualizar una persona por ID
router.put('/people/:id', peopleController.updatePerson);

// Ruta para eliminar una persona por ID
router.delete('/people/:id', peopleController.deletePerson);

export default router;
