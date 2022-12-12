
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import NewRecipe from './components/NewRecipe';
import Favourites from './components/Favourites';
import RecipePage from './components/RecipePage';
import Register from './components/Register';
import Base from './components/Base';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            <Route exact path='/' element={< Base />}></Route>
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/register' element={< Register />}></Route>
            <Route exact path='/feed' element={< Home />}></Route>
            <Route exact path='/new' element={< NewRecipe />}></Route>
            <Route exact path='/favourites' element={< Favourites />}></Route>
            <Route exact path='/profile' element={< Profile />}></Route>
            <Route exact path='/recipe/:id' element={< RecipePage />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
