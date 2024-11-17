import Main from './components/main';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="h-screen flex flex-col gap-4 p-4 bg-[#dee2e6]">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
