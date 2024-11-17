import config from '../../public/config.json';

export default async function getAllPeople<T>(): Promise<
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
