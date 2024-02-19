import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Chat from './components/chat/Chat';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/auth/Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }] = useStateValue();


  return (
    // BEM naming convention
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app-body">
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path='/rooms/:roomId' element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
          <div>
            <p className="footer">Copyright © 2024 Created by <a href="https://shivpathk-portfolio.netlify.app/" rel="noreferrer" target="_blank">Shivam</a> </p>
          </div>
    </div>
  );
}

export default App;
