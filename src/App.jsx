import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddNewPerson from './Components/AddNewPerson';
import RetriveInfo from "./Components/RetrieveInfo";

function App() {


  return (
    <Router>
      <div className="conatiner">
        <div className="main">
          <h1 className='title'>Directory App</h1>
          <div className='tabs'>
            <Link to="/addNewPerson">
              <button>Add New Person</button>
            </Link>
            <Link to="/retriveInfo">
              <button>Retrieve Information</button>
            </Link>
          </div>

          <Routes>
            <Route path='/addNewPerson' element={<AddNewPerson />} />
            <Route path='/retriveInfo' element={<RetriveInfo />}/>
          </Routes>
        </div>
      </div>

    </Router>
  )
}

export default App
