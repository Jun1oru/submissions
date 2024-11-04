import phonebookService from '../services/phonebook';

const Persons = ({ personsToShow, setNotificationMsg }) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .remove(id)
        .then(removedPerson => {
          setNotificationMsg({
            message: `Deleted person with ID ${id}`,
            type: "success",
          });
          console.log(removedPerson);
        })
        .catch(error => {
          setNotificationMsg({
            message: `Information of ${name} has already been removed from server`,
            type: "error",
          });
          personsToShow.filter(person => person.id !== id);
        });
    }
  }

  return (
    <div>
      {personsToShow.map(person =>
        <div key={person.id}>
          {person.name} {person.number}
          <button
            type="button"
            onClick={() => handleDelete(person.id, person.name)}
          >
            delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Persons;