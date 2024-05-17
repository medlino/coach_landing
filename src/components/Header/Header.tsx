import React, { useEffect, useState } from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MobileHeader } from './MobileHeader';
import { DesktopHeader } from './DesktopHeader';

export const Header = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  // Use a consistent placeholder during the server render and the initial client render
  if (!clientSide) {
    return null;
  }

  return <>{isMobile ? <MobileHeader /> : <DesktopHeader />}</>;
};
