import React, { useState, useEffect, useRef } from "react";
import auth from "Redux/auth/auth-operations";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Label, Button } from "./SignUpPage.styles.js";
import authSelectors from "Redux/auth/auth-selectors";
import { ToastContainer, toast } from "react-toastify";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const error = authSelectors.getAuthError(state);
  const toastId = useRef(null);

  const reset = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  const onChange = (e) => {
    switch (e.currentTarget.name) {
      case "email":
        return setEmail(e.target.value);

      case "password":
        return setPassword(e.target.value);

      case "name":
        return setName(e.target.value);

      default:
        return;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
      name,
    };

    dispatch(auth.signUp(credentials));
    reset();
  };

  const errorNotification = () =>
    (toastId.current = toast.error("Operation failed. Try again."));
  const dismiss = () => toast.dismiss(toastId.current);

  useEffect(() => {
    if (error) {
      errorNotification();
    }

    return () => {
      dismiss();
    };
  }, [error]);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Label>
          Email
          <Input
            onChange={onChange}
            type="email"
            value={email}
            name="email"
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            title="Email address is expected"
            required
          />
        </Label>
        <Label>
          Name
          <Input
            onChange={onChange}
            type="text"
            value={name}
            name="name"
            // pattern="^[a-zA-Z]+ [a-zA-Z]+$"
            title="Invalid name given."
            required
          />
        </Label>
        <Label>
          Password
          <Input
            onChange={onChange}
            type="password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Пароль содержать по крайней мере одно число, одну заглавную и строчную буквы, а также не менее 8 и более символов"
            value={password}
            required
          />
        </Label>
        <Button type="submit">Sign Up</Button>
      </Form>
      <ToastContainer />
    </>
  );
}
