import { selectIsLoading } from "../../redux/contacts/selectors";
import {
  selectFilteredContacts,
  selectNameFilter,
} from "../../redux/filters/selectors";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const searchValue = useSelector(selectNameFilter);

  return (
    <div>
      {filteredContacts.length === 0 && !isLoading && !searchValue && (
        <p className={css.infoText}>Your phonebook is empty 😢</p>
      )}

      {filteredContacts.length > 0 && (
        <ul className={css.listContacts}>
          {filteredContacts.map((contact) => (
            <li className={css.itemContact} key={contact.id}>
              <Contact data={contact} />
            </li>
          ))}
        </ul>
      )}
      {filteredContacts.length === 0 && searchValue && (
        <p className={css.infoText}>No contacts found 😢</p>
      )}
    </div>
  );
};

export default ContactList;