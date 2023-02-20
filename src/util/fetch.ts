import fetch from 'node-fetch';

export const fetchApi = async (param: string | number) => {
  const res = await fetch(
    `${process.env.PAYSTACK_VERIFY_PAYMENT_URL}/${param}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
      },
    }
  );
  const data = await res.json();
  return data;
};
