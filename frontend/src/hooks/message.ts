import { useContext } from 'react';
import { globalContext } from '../context/global.context';

export default function useMessage() {
  const context = useContext(globalContext);

  if (context) {
    const { messageApi } = context;
    return { messageApi };
  } else {
    throw new Error('useMessage can only be used inside the GlobalContext');
  }
}
