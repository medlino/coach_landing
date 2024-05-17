import React from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MobileHeader } from './MobileHeader';
import { DesktopHeader } from './DesktopHeader';

export const Header = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return <>{isMobile ? <MobileHeader /> : <DesktopHeader />}</>;
};
