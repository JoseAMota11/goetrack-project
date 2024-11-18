import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { getAllPeople } from '../services/people.service';
import { People } from '../types/people';
import { message } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { Filters } from '../types/filters';

type GlobalContextType = {
  data: People[] | undefined;
  setData: Dispatch<SetStateAction<People[] | undefined>>;
  error: Error | undefined;
  setError: Dispatch<SetStateAction<Error | undefined>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  getData: (filters?: Filters) => Promise<void>;
  messageApi: MessageInstance;
  openAddModal: boolean;
  setOpenAddModal: Dispatch<SetStateAction<boolean>>;
  openEditModal: boolean;
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
  recordId: number | undefined;
  setRecordId: Dispatch<SetStateAction<number | undefined>>;
};

export const globalContext = createContext<GlobalContextType | null>(null);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<People[]>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [recordId, setRecordId] = useState<number>();

  const getData = async (filters?: Filters) => {
    setLoading(true);

    const [data, error] = await getAllPeople<People>(filters);

    if (error) {
      setError(error);
    } else {
      setData(data as People[]);
    }

    setLoading(false);
  };

  return (
    <globalContext.Provider
      value={{
        data,
        setData,
        error,
        setError,
        loading,
        setLoading,
        getData,
        messageApi,
        openAddModal,
        setOpenAddModal,
        openEditModal,
        setOpenEditModal,
        recordId,
        setRecordId,
      }}
    >
      {contextHolder}
      {children}
    </globalContext.Provider>
  );
}
