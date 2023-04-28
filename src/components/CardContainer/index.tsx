import { UpdatedCharacterStatus } from '../../pages/Dashboard/types';
import styles from './cardContainer.module.css';
import { Status } from './components/Status';

export interface ICharacterUnit {
  name: string;
  status: UpdatedCharacterStatus;
  species: string;
  location: string;
  firstSeenIn: string;
  image: string;
}

export const CardContainer = ({
  name,
  status,
  species,
  location,
  firstSeenIn,
  image,
}: ICharacterUnit) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageBox}>
        <img src={image} alt='Qualquer coisa' />
      </div>
      <div className={styles.infoBox}>
        <h2>{name}</h2>
        <div className={styles.basicInfo}>
          <Status circleStatus={status}>{species}</Status>
        </div>
        <div className={styles.seenInfo}>
          <span>Location</span>
          <p>{location}</p>
        </div>
        <div className={styles.seenInfo}>
          <span>first seen in:</span>
          <p>{firstSeenIn}</p>
        </div>
      </div>
    </div>
  );
};
