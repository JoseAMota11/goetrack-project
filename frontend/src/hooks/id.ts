import { useContext } from 'react';
import { globalContext } from '../context/global.context';

export default function useRecordId() {
  const context = useContext(globalContext);

  if (context) {
    const { recordId, setRecordId } = context;
    return { recordId, setRecordId };
  } else {
    throw new Error('useRecordId can only be used inside the GlobalContext');
  }
}
