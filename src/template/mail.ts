export const signupTemplate = ({ name, url }: any) => {
  return `
  <p>Hi ${name}</p>
  <p>You are on your way!</p>
  <p>Let's confirm your email address.</p>
  <p>By clicking on the link, you are confirming your address.</p>
  <a href=${url}>
    <button>Confirm Email Address</button>
  </a>
  `;
};
