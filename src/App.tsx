import { useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import './App.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className={styles.mainContainer}>
      <img src='/image/rick-and-morty.jpg' alt='rick and morty' />
      <div className={styles.buttonBox}>
        <button onClick={() => navigate('/dashboard')}>
          Enter the world of Rick and Morty.
        </button>
      </div>
    </main>
  );
}

export default HomePage;
