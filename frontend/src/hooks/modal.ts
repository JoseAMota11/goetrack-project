import { useContext } from 'react';
import { globalContext } from '../context/global.context';

export function useOpenAddModal() {
  const context = useContext(globalContext);

  if (context) {
    const { openAddModal, setOpenAddModal } = context;

    return { open: openAddModal, setOpen: setOpenAddModal };
  } else {
    throw new Error(
      'useOpenAddModal can only be used inside the GlobalContext'
    );
  }
}

export function useOpenEditModal() {
  const context = useContext(globalContext);

  if (context) {
    const { openEditModal, setOpenEditModal } = context;

    return { open: openEditModal, setOpen: setOpenEditModal };
  } else {
    throw new Error(
      'useOpenEditModal can only be used inside the GlobalContext'
    );
  }
}
