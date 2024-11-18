import db from '../config/db';
import { Filters } from '../utils/types';
import { Person } from '../utils/validations';

export class PeopleModel {
  static create(
    name: string,
    surname: string,
    fullName: string,
    dateOfBirth: string,
    nationality: string,
    age: number
  ) {
    const stmt =
      db.prepare(`INSERT INTO people (name, surname, fullName, dateOfBirth, nationality, age) 
      VALUES (?, ?, ?, ?, ?, ?)`);
    stmt.run(name, surname, fullName, dateOfBirth, nationality, age);
  }

  static findAll(filters: Filters) {
    let query = 'SELECT * FROM people';
    const conditions: string[] = [];
    const params: any = {};

    if (filters.fullName) {
      conditions.push('fullName LIKE @fullName');
      params.fullName = `%${filters.fullName}%`;
    }
    if (filters.dateOfBirth) {
      conditions.push('dateOfBirth = @dateOfBirth');
      params.dateOfBirth = filters.dateOfBirth;
    }
    if (filters.nationality) {
      conditions.push('nationality = @nationality');
      params.nationality = filters.nationality;
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY ROWID DESC';

    const stmt = db.prepare(query);
    return stmt.all(params);
  }

  static findById(id: number) {
    const stmt = db.prepare('SELECT * FROM people WHERE id = ?');
    return stmt.get(id);
  }

  static update(id: number, data: Partial<Person>) {
    const stmt = db.prepare(
      `UPDATE people SET name = ?, surname = ?, fullName = ?, dateOfBirth = ?, nationality = ?, age = ? WHERE id = ?`
    );
    const result = stmt.run(
      data.name,
      data.surname,
      data.fullName,
      data.dateOfBirth,
      data.nationality,
      data.age,
      id
    );

    return result.changes;
  }

  static delete(id: number) {
    const stmt = db.prepare('DELETE FROM people WHERE id = ?');
    const result = stmt.run(id);

    return result.changes;
  }
}
