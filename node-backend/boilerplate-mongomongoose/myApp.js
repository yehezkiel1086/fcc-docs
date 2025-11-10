require('dotenv').config();

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema)

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Yehezkiel",
    age: 24,
    favoriteFoods: ["Sushi", "Sashimi", "Gefilte Fish"]
  })

  person.save(function(err, data) {
    if (!err) {
      done(null, data);
    }
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).then(data => {
    done(null, data);
  }).catch(err => {
    console.error(err)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }).then(data => {
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }).then(data => {
    done(null /*, data*/, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId).then(data => {
    done(null /*, data*/, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId).then(data => {
    data.favoriteFoods.push(foodToAdd)
    data.save().then(result => {
      done(null /*, data*/, result);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOne({
    name: personName
  }).then(data => {
    data.age = ageToSet
    data.save().then(res => {
      done(null /*, data*/, res);
    })
  })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId).then(data => {
    done(null /*, data*/, data);
  })

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({
    name: nameToRemove
  }).then(data => {
    done(null /*, data*/, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({
    favoriteFoods: foodToSearch
  }).sort({name: 1}).limit(2).select({
    name: true,
    favoriteFoods: true
  }).exec().then(data => {
    done(null /*, data*/, data);
  })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
