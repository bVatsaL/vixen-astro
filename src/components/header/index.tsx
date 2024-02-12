// import { useEffect, Suspense } from 'react';
// import { ErrorBoundary } from 'react-error-boundary';
// import HudsonHeader from '../header/header.tsx';
// import { ErrorFallback } from '@components/error-fallback/index.tsx';
import { HeaderSkeleton } from '@components/skeletons/header.skeleton.tsx';
import { RecoilRoot } from 'recoil-ssr';

const Header = () => {	
	return (
    <RecoilRoot>
		 {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
      {/* // <Suspense fallback={<HeaderSkeleton />}> */}
        <HeaderSkeleton />
         {/* <HudsonHeader /> */}
       {/* </Suspense> */}
      {/* </ErrorBoundary> */}
    </RecoilRoot>
	);
};
export default Header;
