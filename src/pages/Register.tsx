import { Form, Link } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  return (
    <Wrapper>
      <Form className="form">
        <h1>Register</h1>
        <div className="form-row">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
          />
        </div>
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="text" id="email" name="email" className="form-input" />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            className="form-input"
          />
        </div>
        <div className="register-btn">
          <button>Register</button>
        </div>
        <p>
          Already a member?
          <Link to="/login" className="login">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .form {
    width: 25rem;
    min-height: fit-content;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  h1 {
    font-size: 2rem;
    letter-spacing: 1px;
    line-height: 2.25;
    font-weight: 700;
    color: hsl(214 30% 28%/1);
    margin-top: 1rem;
  }
  .form-row {
    display: flex;
    flex-direction: column;
    min-width: 80%;
    margin-top: 1.25rem;
  }
  .form-label {
    line-height: 1.25;
    color: hsl(214 30% 32%/1);
  }
  .form-input {
    font-size: 1rem;
    color: #4f5052;
    padding: 0.85rem;
    border-radius: 10px;
    margin-top: 0.5rem;
    border: 2px solid #d4d6da;
  }
  .register-btn {
    min-width: 80%;
    margin-top: 2rem;
  }
  button {
    min-width: 100%;
    padding: 1rem;
    background-color: hsl(212 100% 44%);
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  button:hover {
    background-color: hsl(212 100% 36%);
  }
  p {
    margin-top: 1.1rem;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  .login {
    color: hsl(212 100% 44%);
    text-decoration: none;
    margin-left: 10px;
    font-size: 1.1rem;
  }
  .login:hover {
    text-decoration: underline;
  }
`;
