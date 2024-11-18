import { Person } from './validations';

export type ErrorValidation = {
  status: number;
  message: string;
  errors: {
    message: string;
    path: string[];
    error: string;
  }[];
};

export function isCustomError(error: unknown): error is ErrorValidation {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const customError = error as ErrorValidation;

  if (typeof customError.status !== 'number') {
    return false;
  }

  if (typeof customError.message !== 'string') {
    return false;
  }

  if (!Array.isArray(customError.errors)) {
    return false;
  }

  return true;
}

export type Filters = Pick<
  Person,
  'fullName' | 'dateOfBirth' | 'nationality' | 'age'
>;
