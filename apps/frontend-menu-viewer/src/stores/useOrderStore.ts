interface OrderStore {
  paymentMethod: 'card' | 'kakao' | 'naver' | null;
  couponId: string | null;
  tip: number;
  requestNote: string;
  placeOrder: () => Promise<void>;
  setPaymentMethod: (method: 'card' | 'kakao' | 'naver') => void;
}
