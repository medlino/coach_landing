export const roleMap: Record<string, string> =
  process.env.ENV === 'dev'
    ? {
        '1229468414318219316': 'Admin',
        '1229468660536574123': 'Bot',
        '1229468512351682571': 'Moderátor',
        '1229468577279770755': 'VIP',
        '1229467618214281450': 'Vendég',
      }
    : {
        '1229468414318219316': 'Admin',
        '1229468660536574123': 'Bot',
        '1229468512351682571': 'Moderátor',
        '1229468577279770755': 'VIP',
        '1229467618214281450': 'Vendég',
      };