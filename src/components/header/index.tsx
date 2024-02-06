import { useEffect, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import hudsonHeader from '../header/header.tsx';

const Header = () => {	
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<HeaderSkeleton />}>
        <HudsonHeader />
      </Suspense>
    </ErrorBoundary>
	);
};

export default Header;
