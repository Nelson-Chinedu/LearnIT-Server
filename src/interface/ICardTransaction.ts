export interface ICardTransaction {
  data: {
    reference: string;
    amount: string | number;
    paid_at: Date;
    authorization: {
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: 'card';
      card_type: 'visa';
    };
  };
}
