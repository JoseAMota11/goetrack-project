import config from '../config.json';

export async function getAllPeople<T>(): Promise<
  [T[] | undefined, Error | undefined]
> {
  try {
    const res = await fetch(`${config.url}/api/v1/people`);

    if (res.ok) {
      const data = await res.json();
      return [data, undefined];
    }

    throw new Error(await res.text());
  } catch (error) {
    return [undefined, error as Error];
  }
}

export async function deletePeopleById(
  id: number
): Promise<[{ message: string } | undefined, { error: string } | undefined]> {
  try {
    const res = await fetch(`${config.url}/api/v1/people/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      const data = await res.json();
      return [data as { message: string }, undefined];
    }

    throw await res.json();
  } catch (error) {
    return [undefined, error as { error: string }];
  }
}
