import { Button } from 'antd';
import TableContainer from './table-container';
import { useOpenAddModal } from '../hooks/modal';

function Main() {
  const { setOpenAddModal } = useOpenAddModal();

  return (
    <main className="space-y-4 bg-white px-4 py-6 rounded-md shadow-md">
      <section className="flex justify-end">
        <Button
          type="primary"
          className="w-[120px] h-10 text-base"
          onClick={() => setOpenAddModal(true)}
        >
          Añadir
        </Button>
      </section>
      <section>
        <TableContainer />
      </section>
    </main>
  );
}

export default Main;
