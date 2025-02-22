export const signupTemplate = ({ name, url, role }: any) => {
  return `
  <h2>Confirm your account</h2>
  <p>Hi ${name}</p>
  <p>Thank you for signing up as a ${role} on LearnIT. To confirm your account,</p>
  <p>Please follow the button below.</p>
  <a href=${url}>
    <button>Confirm Account</button>
  </a>
  `;
};
