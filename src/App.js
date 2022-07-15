import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from './components/NavBar';
import HomeCarousel from './components/HomeCarousel';
import ItemListContainer from './components/ItemListContainer';
import ItemCountModal from './components/ItemCountModal';
import Footer from './components/Footer';
import './App.scss';

function App() {
  return (
    <div className="App">
       <NavBar/>
       <HomeCarousel/>
       <ItemListContainer/>
       <ItemCountModal/>
       <Footer/>
    </div>
  );
}

export default App;
