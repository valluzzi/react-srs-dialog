import logo from './logo.svg';
import './App.css';
import SrsDialog from './lib/dialogs/SrsDialog';
import ParentComponent from './lib/buttonParent/ButtonParent';


// al click del button che riporta il sistema scelto si apre una modale con il filtro (input) e sotto la griglia dinamica delle opzioni

function App() {
  return (
    <ParentComponent />
  );
}

export default App;
