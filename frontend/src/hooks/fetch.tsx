import { useContext } from 'react';
import { globalContext } from '../context/global.context';

export default function useFetch() {
  const context = useContext(globalContext);

  if (context) {
    const { data, error, loading, getData } = context;
    return { data, error, loading, getData };
  } else {
    throw new Error('useFetch can only be used inside the GlobalContext');
  }
}
