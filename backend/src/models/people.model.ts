import db from '../config/db';
import { Person } from '../utils/validations';

export class PeopleModel {
  static create(
    name: string,
    surname: string,
    fullName: string,
    dateOfBirth: string,
    nationality: string,
    age: number,
    canVote: boolean
  ) {
    const stmt =
      db.prepare(`INSERT INTO people (name, surname, fullName, dateOfBirth, nationality, age, canVote) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`);
    stmt.run(
      name,
      surname,
      fullName,
      dateOfBirth,
      nationality,
      age,
      canVote ? 1 : 0
    );
  }

  static findAll() {
    const stmt = db.prepare('SELECT * FROM people');
    return stmt.all();
  }

  static findById(id: number) {
    const stmt = db.prepare('SELECT * FROM people WHERE id = ?');
    return stmt.get(id);
  }

  static update(id: number, data: Partial<Person>) {
    const stmt = db.prepare(
      `UPDATE people SET name = ?, surname = ?, fullName = ?, dateOfBirth = ?, nationality = ?, age = ?, canVote = ? WHERE id = ?`
    );
    stmt.run(
      data.name,
      data.surname,
      data.fullName,
      data.dateOfBirth,
      data.nationality,
      data.age,
      data.canVote ? 1 : 0,
      id
    );
  }

  static delete(id: number) {
    const stmt = db.prepare('DELETE FROM people WHERE id = ?');
    stmt.run(id);
  }
}
