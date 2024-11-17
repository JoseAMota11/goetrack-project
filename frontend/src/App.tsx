import AddPeopleForm from './components/add';
import Main from './components/main';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Navbar />
      <Main />
      <AddPeopleForm />
    </div>
  );
}

export default App;
