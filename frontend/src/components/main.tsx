import { Button } from 'antd';
import TableContainer from './table-container';
import { GlobalContextProvider } from '../context/global.context';

function Main() {
  return (
    <GlobalContextProvider>
      <main className="space-y-4 bg-white px-4 py-6 rounded-md shadow-md">
        <section className="flex justify-end">
          <Button type="primary" className="w-[120px] h-10 text-base">
            Añadir
          </Button>
        </section>
        <section>
          <TableContainer />
        </section>
      </main>
    </GlobalContextProvider>
  );
}

export default Main;
