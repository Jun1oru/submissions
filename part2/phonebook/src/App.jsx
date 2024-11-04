import { useState, useEffect } from "react";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from "./services/phonebook";
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterPerson, setFilterPerson] = useState('');
  const [notificationMsg, setNotificationMsg] = useState({
    message: null,
    type: "notification",
  });

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, [persons]);

  const handleNewName = (event) =>
    setNewName(event.target.value);

  const handleNewNumber = (event) =>
    setNewNumber(event.target.value);

  const handleFilterPerson = (event) =>
    setFilterPerson(event.target.value);

  const handleNotificationMsg = (newMsg) => {
    setNotificationMsg(notificationMsg => ({
      ...notificationMsg,
      ...newMsg
    }));

    setTimeout(() => {
      const resetMsg = {
        message: null,
        type: "notification",
      };
      setNotificationMsg(notificationMsg => ({
        ...notificationMsg,
        ...resetMsg
      }));
    }, 5000);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson === undefined) {
      phonebookService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));

          setNewName('');
          setNewNumber('');
          handleNotificationMsg({
            message: `Added ${newPerson.name}!`,
            type: 'success',
          });
        });
    } else if (existingPerson.name === newName) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        return phonebookService
          .update(existingPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === existingPerson.id ? returnedPerson : p));
            
            setNewName('');
            setNewNumber('');
            handleNotificationMsg({
              message: `Updated ${existingPerson.name}'s phone number to ${newPerson.number}!`,
              type: 'success',
            });
          });
      }
    }
  };

  const personsToShow = filterPerson === ""
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(filterPerson.toLowerCase()));
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        notificationMsg={notificationMsg}
      />
      <Filter
        filterPerson={filterPerson}
        handleFilterPerson={handleFilterPerson}
      />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        setNotificationMsg={handleNotificationMsg}
      />
    </div>
  );
};

export default App;