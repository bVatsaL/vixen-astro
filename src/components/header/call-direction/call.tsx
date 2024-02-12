import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import Phoneicon from '@resources/svg-icons/phone.svg';
import { Img } from '@components/img';
import { useCallRail } from '@hooks/useCallRail';
import styles from './styles.module.scss';

interface ICall {
  className?: string;
  number?: string;
  callus?: string;
}

const HeaderCall: React.FC<ICall> = (props) => {
  const { number, className, callus = 'Call Us' } = props;
  const extraClasses = getExtraClasses(styles, className);
  useCallRail();
  return (
    <a
      href={`tel:${number}`}
      className={cn(styles.call_Direction_Btn, extraClasses)}
      data-events='clickToCall'
      data-vehicle-details=''
      data-click-to-call-department='Sales'
      data-fda-action='click/touch'
    >
      <Img src={Phoneicon} alt='phone' />
      {callus}
    </a>
  );
};

export default HeaderCall;
