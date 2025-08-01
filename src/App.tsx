import './index.css';
import AppRoutes from './routes';
import SEOManager from './components/SEOManager';

function App() {
  return (
    <>
      <SEOManager />
      <AppRoutes />
    </>
  );
}

export default App;
