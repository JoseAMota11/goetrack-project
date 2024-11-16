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

  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).json({ error: 'Esta persona no existe' });
  }
};

export const updatePerson = (req: Request, res: Response) => {
  const { id } = req.params;
  const result = PeopleService.updatePerson(Number(id), req.body);

  if (result > 0) {
    res.status(204);
  } else {
    res.status(404).json({ error: 'Esta persona no existe' });
  }
};

export const deletePerson = (req: Request, res: Response) => {
  const { id } = req.params;
  const result = PeopleService.deletePerson(Number(id));

  if (result > 0) {
    res.status(204);
  } else {
    res.status(404).json({ error: 'Esta persona no existe' });
  }
};
