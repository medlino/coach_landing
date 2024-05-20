import React, { useEffect, useState } from 'react';
import { createMedia } from '@artsy/fresnel';
import clsx from 'clsx';

import { MobileHeader } from './MobileHeader';
import { DesktopHeader } from './DesktopHeader';

import style from './Header.module.scss';

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

  return (
    <MediaContextProvider>
      <Media greaterThanOrEqual="md">
        <DesktopHeader
          className={clsx(className, clientSide ? style.show : '')}
        />
      </Media>
      <Media lessThan="md">
        <MobileHeader
          className={clsx(className, clientSide ? style.show : '')}
        />
      </Media>
    </MediaContextProvider>
  );
};
