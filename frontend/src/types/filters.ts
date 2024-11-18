import { People } from './people';

export type Filters = Pick<
  Partial<People>,
  'fullName' | 'dateOfBirth' | 'nationality'
>;
