import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactsList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Wrapper } from './App.styled';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const getDefaultContacts = () => {
  const savedContacts = localStorage.getItem('contacts');

  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  }
  return defaultContacts;
};
export const App = () => {
  const [contacts, setContacts] = useState(getDefaultContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number }, { resetForm }) => {
    if (contacts.find(value => value.name === name)) {
      toast.error(`${name} is already in the contact list`);
      return;
    }

    setContacts(prevState => [
      ...prevState,
      { id: nanoid(), name: name, number: number },
    ]);

    toast.success(`${name} added to contact list`);
    resetForm();
  };
  const changeFilter = filterValue => {
    setFilter(filterValue);
  };
  const handleDelete = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
    toast.success(`The contact has been deleted`);
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <Filter value={filter} onChange={changeFilter} />
      <h2>Contacts</h2>
      <ContactsList
        listOfContacts={visibleContacts}
        handleDelete={handleDelete}
      />
      <Toaster />
    </Wrapper>
  );
};
