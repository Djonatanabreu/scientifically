import { useNavigate } from 'react-router-dom';
import './App.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <main>
      <div>
        <button onClick={() => navigate('/dashboard')}>
          Click here to enter the world of Rick and Morty.
        </button>
      </div>
    </main>
  );
}

export default HomePage;
