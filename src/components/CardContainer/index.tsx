import styles from './cardContainer.module.css';
import { Status } from './components/Status';

interface ICardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

export const CardContainer = ({ name, ...props }: ICardContainerProps) => {
  return (
    <div className={styles.cardContainer} {...props}>
      <div className={styles.imageBox}>
        <img src='' alt='' />
      </div>
      <div className={styles.infoBox}>
        <h2>{name}</h2>
        <div className={styles.basicInfo}>
          <Status circleStatus={'on'}>Unknown /</Status>

          <span>Species</span>
        </div>
        <div className={styles.seenInfo}>
          <span>Last known location</span>
          <p>Location</p>
        </div>
        <div className={styles.seenInfo}>
          <span>first seen in:</span>
          <p>Location</p>
        </div>
      </div>
    </div>
  );
};
