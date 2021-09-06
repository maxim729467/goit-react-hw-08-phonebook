import ContactForm from "../ContactForm";
import Filter from "../Filter";
import ContactList from "../ContactList";
import { UserPageView } from "./UserPage.styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, postContact } from "services";
import { useEffect } from "react";
import {
  getAllContacts,
  getFilteredContacts,
  getFilter,
} from "Redux/contacts/contacts-selectors";

export default function UserPage() {
  const state = useSelector((state) => state);
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const notify = (name) => toast.warn(`${name} is already in contacts`);

  const onAddContact = (newContact) => {
    const contactPresenceCheck = getAllContacts(state).find(
      ({ name }) => name === newContact.name
    );

    if (contactPresenceCheck !== undefined) {
      notify(newContact.name);
      return;
    }

    dispatch(postContact(newContact, token));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    dispatch(fetchContacts(token, abortOptions));
  }, [dispatch, isLoggedIn, token]);

  const filteredContacts = getFilteredContacts(state);

  return (
    <UserPageView>
      <ToastContainer />
      <h1>Phonebook</h1>
      <ContactForm addContact={onAddContact} />
      <h2>Contacts</h2>
      <Filter value={getFilter(state)} />
      <ContactList contacts={filteredContacts} />
    </UserPageView>
  );
}
