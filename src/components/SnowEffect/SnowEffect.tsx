import { useEffect } from 'react';

export const SnowEffect: React.FC = () => {
  useEffect(() => {
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    document.body.appendChild(snowContainer);

    const particlesPerThousandPixels = 0.1;
    const fallSpeed = 1.25;
    const pauseWhenNotActive = true;
    const maxSnowflakes = 300;
    const snowflakes: HTMLDivElement[] = [];

    let snowflakeInterval: NodeJS.Timeout;
    let isTabActive = true;

    const resetSnowflake = (snowflake: HTMLDivElement) => {
      const size = Math.random() * 5 + 1;
      const viewportWidth = window.innerWidth - size;
      const viewportHeight = window.innerHeight;

      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.left = `${Math.random() * viewportWidth}px`;
      snowflake.style.top = `-${size}px`;

      const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
      snowflake.style.animationDuration = `${animationDuration}s`;
      snowflake.style.animationTimingFunction = 'linear';
      snowflake.style.animationName =
        Math.random() < 0.5 ? 'fall' : 'diagonal-fall';

      setTimeout(() => {
        if (parseInt(snowflake.style.top, 10) < viewportHeight) {
          resetSnowflake(snowflake);
        } else {
          snowflake.remove();
        }
      }, animationDuration * 1000);
    };

    const createSnowflake = () => {
      if (snowflakes.length < maxSnowflakes) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflakes.push(snowflake);
        snowContainer.appendChild(snowflake);
        resetSnowflake(snowflake);
      }
    };

    const generateSnowflakes = () => {
      const numberOfParticles =
        Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
        particlesPerThousandPixels;
      const interval = 5000 / numberOfParticles;

      clearInterval(snowflakeInterval);
      snowflakeInterval = setInterval(() => {
        if (isTabActive && snowflakes.length < maxSnowflakes) {
          requestAnimationFrame(createSnowflake);
        }
      }, interval);
    };

    const handleVisibilityChange = () => {
      if (!pauseWhenNotActive) return;

      isTabActive = !document.hidden;
      if (isTabActive) {
        generateSnowflakes();
      } else {
        clearInterval(snowflakeInterval);
      }
    };

    generateSnowflakes();

    window.addEventListener('resize', () => {
      clearInterval(snowflakeInterval);
      setTimeout(generateSnowflakes, 1000);
    });

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(snowflakeInterval);
      snowContainer.remove();
    };
  }, []);

  return null;
};
