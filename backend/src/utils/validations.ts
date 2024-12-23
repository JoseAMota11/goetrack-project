import { z } from 'zod';

const personSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  surname: z.string().min(1, 'El apellido es obligatorio'),
  fullName: z.string().nullable(),
  dateOfBirth: z
    .string()
    .regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'La fecha de nacimiento debe estar en formato DD/MM/YYYY'
    ),
  nationality: z.string().min(1, 'La nacionalidad es obligatoria'),
  age: z.number().min(0, 'La edad debe ser un número positivo'),
});

export type Person = typeof personSchema._type;

export const validatePerson = (data: unknown) => {
  try {
    personSchema.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw {
        status: 400,
        message: 'Dato inválido',
        errors: err.errors,
      };
    }
  }
};
