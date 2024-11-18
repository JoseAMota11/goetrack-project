import AddPeopleForm from './components/add';
import EditPeopleForm from './components/edit';
import Footer from './components/forter';
import Main from './components/main';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Navbar />
      <Main />
      <Footer />
      <AddPeopleForm />
      <EditPeopleForm />
    </div>
  );
}

export default App;
