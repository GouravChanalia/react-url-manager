import './App.css';
import Header from './components/Header.component';
import UrlManager from './components/Url-Manager/index.component';
import {ToastContainer} from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <UrlManager />
    </div>
  );
}

export default App;
