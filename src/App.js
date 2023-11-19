
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import { DataProvider, useData } from './DataContext';

function App() {
  
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Screen1 />} />
            <Route path="/dhunjam" element={<Screen2 />} />
          </Routes>
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;

