const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const isValidEmail = (email: string) => emailRegex.test(email);

const giftIdRegex = /^[A-Za-z0-9]{32}$/;

export const isValidQRId = (giftId: string | null) => {
  if (giftId === null) return false;
  return giftIdRegex.test(giftId);
};
