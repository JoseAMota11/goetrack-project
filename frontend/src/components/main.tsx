import { Button } from 'antd';
import TableContainer from './table-container';
import { useOpenAddModal } from '../hooks/modal';
import Filters from './filters';

function Main() {
  const { setOpen } = useOpenAddModal();

  return (
    <main className="space-y-4 bg-white px-4 py-6 rounded-md shadow-md">
      <section className="flex justify-end">
        <Button
          type="primary"
          className="w-[120px] h-10 text-base"
          onClick={() => setOpen(true)}
        >
          Añadir
        </Button>
      </section>
      <section>
        <h3 className="text-lg font-semibold">Filtros:</h3>
        <Filters />
      </section>
      <section>
        <TableContainer />
      </section>
    </main>
  );
}

export default Main;
