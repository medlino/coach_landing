export interface Gift {
  qr_num: number;
  qr_id: string;
  name: string;
  tier: number;
  giftId: string;
  claimedAt: null | string;
  winnerId: null | string | string[];
  winnerEmail: null | string | string[];
}
