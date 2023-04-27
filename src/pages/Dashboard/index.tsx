import { CardContainer } from '../../components/CardContainer';
import styles from './dashboard.module.css';

export const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1>dashboard</h1>
      <div className={styles.charCardsContainer}>
        {[
          'rick',
          'morty',
          'beth',
          'summer',
          'jerry',
          'daryl',
          'jessica',
          'phoebe',
          'brian',
          'kramer',
        ].map((item, index) => {
          return <CardContainer name={item} key={index} />;
        })}
      </div>
    </div>
  );
};
