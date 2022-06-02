import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddEditBlog from './pages/AddEditBlog';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addBlog' element={<AddEditBlog />} />
          <Route path='/editBlog/:id' element={<AddEditBlog />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
