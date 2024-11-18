import config from '../config.json';
import { Filters } from '../types/filters';
import { People } from '../types/people';

export async function getAllPeople<T>(
  filters?: Filters
): Promise<[T[] | undefined, Error | undefined]> {
  try {
    const searchParams = new URLSearchParams('');

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          searchParams.append(key, String(value));
        }
      }
    }

    const res = await fetch(
      `${config.url}/api/v1/people${
        filters ? `?${searchParams.toString()}` : ''
      }`
    );

    if (res.ok) {
      const data = await res.json();
      return [data, undefined];
    }

    throw new Error(await res.text());
  } catch (error) {
    return [undefined, error as Error];
  }
}

export async function getOnePeopleById<T>(
  id: number
): Promise<[T | undefined, Error | undefined]> {
  try {
    const res = await fetch(`${config.url}/api/v1/people/${id}`);

    if (res.ok) {
      const data = await res.json();
      return [data, undefined];
    }

    throw new Error(await res.text());
  } catch (error) {
    return [undefined, error as Error];
  }
}

export async function createPeople(body: People) {
  const res = await fetch(`${config.url}/api/v1/people/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return (await res.json()) as { message: string };
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

export async function updatePeopleById(
  id: number,
  body: People
): Promise<[{ message: string } | undefined, { error: string } | undefined]> {
  try {
    const res = await fetch(`${config.url}/api/v1/people/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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
