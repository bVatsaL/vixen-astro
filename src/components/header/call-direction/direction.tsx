import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import Locationicon from '@resources/svg-icons/location.svg';
import { Link } from '@components/link';
import { Img } from '@components/img';
import styles from './styles.module.scss';

interface IDirections {
  className?: string;
  url?: string;
  directions?: string;
  target?:'_self' | '_blank'
}

const HeaderDirections: React.FC<IDirections> = (props) => {
  const { url, className, directions = 'Directions',target='_self' } = props;
  const extraClasses = getExtraClasses(styles, className);
  if (!url) {
    return null;
  }
  return (
    <Link data-events='getDirections' target={target} to={url} className={cn(styles.call_Direction_Btn, extraClasses)}>
      <Img src={Locationicon} alt='directions' />
      {directions}
    </Link>
  );
};

export default HeaderDirections;
