import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import Card from './components/card';
import MainImg from './containers/mainImg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Header/>
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/player-image/:id" element={<MainImg />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
