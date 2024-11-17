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

type GlobalContextType = {
  data: People[] | undefined;
  setData: Dispatch<SetStateAction<People[] | undefined>>;
  error: Error | undefined;
  setError: Dispatch<SetStateAction<Error | undefined>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  getData: () => Promise<void>;
  messageApi: MessageInstance;
};

export const globalContext = createContext<GlobalContextType | null>(null);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<People[]>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const getData = async () => {
    setLoading(true);

    const [data, error] = await getAllPeople<People>();

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
      }}
    >
      {contextHolder}
      {children}
    </globalContext.Provider>
  );
}
