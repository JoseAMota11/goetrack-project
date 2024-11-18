import { PeopleModel } from '../models/people.model';
import { Filters } from '../utils/types';
import { Person } from '../utils/validations';

export class PeopleService {
  static createPerson(
    name: string,
    surname: string,
    fullName: string,
    dateOfBirth: string,
    nationality: string,
    age: number
  ) {
    PeopleModel.create(name, surname, fullName, dateOfBirth, nationality, age);
  }

  static getAllPeople(query: Filters) {
    return PeopleModel.findAll(query);
  }

  static getPersonById(id: number) {
    return PeopleModel.findById(id);
  }

  static updatePerson(id: number, data: Partial<Person>) {
    return PeopleModel.update(id, data);
  }

  static deletePerson(id: number) {
    return PeopleModel.delete(id);
  }
}
