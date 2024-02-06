import cn from 'classnames';
import { SearchBarSkeleton } from '@components/search-bar/skeleton';
import header from './header.skeleton.scss';

export const HeaderSkeleton = () => (
  <div className={header.header_Skeleton_Contain}>
    <div className={header.header_Contain}>
      <div className={cn(header.flex_center, 'container container-fluid')}>
        <div className={cn('skeleton_Box', header.logo_Box)} />
        <div className={cn('skeleton_Box', header.menu_Btn)} />
        <div className={cn(header.menu_Contain, header.flex_center)}>
          {[...Array(7)].map((_, index) => (
            <span key={index} className={cn('skeleton_Box', header.text_Box)} />
          ))}
        </div>
        <SearchBarSkeleton />
      </div>
    </div>
  </div>
);
