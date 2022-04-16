const express = require("express");

const app = express();
app.use(express.json());

const isNameUnique = (name) =>
  persons.find((person) => person.name == name) ? false : true;

let persons = [
  {
    id: 1,
    name: "Nancy Ocampo",
    number: "123456789",
  },
  {
    id: 2,
    name: "Canela Lopez",
    number: "789123123s",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Phonebook API </h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id == id);

  if (person) {
    response.json(person);
  } else {
    response.send(404).end();
  }
});

app.get("/info", (request, response) => {
  const date = new Date().toISOString();
  response.send(`Phonebook has info for ${persons.length} people ${date}`);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.json(persons);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  const ids = persons.map((person) => person.id);
  const id = Math.max(...ids) + 1;

  if (!person.name)
    return response.status(400).json({
      error: "required name field is missing",
    });
  if (!person.number)
    return response.status(400).json({
      error: "required number field is missing",
    });

  if (!isNameUnique(person.name))
    return response.status(400).json({
      error: "name must be unique",
    });

  const newPerson = {
    id: id,
    name: person.name,
    number: person.number,
  };

  persons = persons.concat(newPerson);
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
