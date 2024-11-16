import { Request, Response } from 'express';
import { PeopleService } from '../services/people.service';

export const createPerson = (req: Request, res: Response) => {
  const { name, surname, fullName, dateOfBirth, nationality, age, canVote } =
    req.body;
  PeopleService.createPerson(
    name,
    surname,
    fullName,
    dateOfBirth,
    nationality,
    age,
    canVote
  );

  res.status(201).json({ message: 'Persona creada satisfactoriamente' });
};

export const getAllPeople = (req: Request, res: Response) => {
  const people = PeopleService.getAllPeople();

  res.status(200).json(people);
};

export const getPersonById = (req: Request, res: Response) => {
  const { id } = req.params;
  const person = PeopleService.getPersonById(Number(id));

  res.status(200).json(person);
};

export const updatePerson = (req: Request, res: Response) => {
  const { id } = req.params;
  PeopleService.updatePerson(Number(id), req.body);

  res.status(200).json({ message: 'Persona actualizada satisfactoriamente' });
};

export const deletePerson = (req: Request, res: Response) => {
  const { id } = req.params;
  PeopleService.deletePerson(Number(id));

  res.status(200).json({ message: 'Persona eliminada satisfactoriamente' });
};
