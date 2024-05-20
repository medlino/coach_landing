import React, { useEffect, useState } from 'react';
import { createMedia } from '@artsy/fresnel';

import { MobileHeader } from './MobileHeader';
import { DesktopHeader } from './DesktopHeader';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1192,
  },
});

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  // Use a consistent placeholder during the server render and the initial client render
  if (!clientSide) {
    return null;
  }

  return (
    <MediaContextProvider>
      <Media lessThan="md">
        <MobileHeader className={className} />
      </Media>
      <Media greaterThanOrEqual="md">
        <DesktopHeader className={className} />
      </Media>
    </MediaContextProvider>
  );
};
