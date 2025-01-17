use("booksDB");

// ------- Books Schema ------- //

db.createCollection("books",{
    validator: { $jsonSchema: { 
      bsonType: "object", 
      required: [ "title", "release_year", "category"], 
      properties: { 
         title: { 
            bsonType: "string", 
            description: "required and must be a string" }, 
         release_year: { 
            bsonType: "array", 
            description: "required and must be a Date" }, 
         category: { 
            bsonType: "string", 
            description: "required and must be a string" }
      }
   }
}
});

// ------- Authors Schema ------- //

db.createCollection("authors",{
    validator: { $jsonSchema: { 
      bsonType: "object", 
      required: [ "name", "last_name", "date_birth", "country"], 
      properties: { 
        name: { 
            bsonType: "string", 
            description: "required and must be a string" }, 
        last_name: { 
            bsonType: "string", 
            description: "required and must be a string" }, 
        date_birth: { 
            bsonType: "date", 
            description: "required and must be a Date" },
        country: { 
            bsonType: "string", 
            description: "required and must be a string" },
      }
   }
}
});

// ------- Insert Authors ------- //

db.authors.insertOne({ 
    _id: "ALCAM1913",
    name: "Albert", 
    last_name: "Camus", 
    date_birth: new Date("1913-11-07"), 
    country: "Algeria" 
});

db.authors.insertOne({ 
    _id: "FRIE1844",
    name: "Friedrich", 
    last_name: "Nietzsche", 
    date_birth: new Date("1844-10-15"), 
    date_death: new Date("1900-08-25"), 
    country: "Germany" 
});

db.authors.insertOne({ 
    _id: "WISH1564",
    name: "William", 
    last_name: "Shakespeare", 
    date_birth: new Date("1564-04-23"), 
    date_death: new Date("1616-04-23"), 
    country: "England" 
});

// ------- Insert Books ------- //

db.books.insertOne({ 
    title: "El extranjero", 
    release_year: [     
        new Date("1942-01-01").getFullYear()
    ], 
    category: "Novela", 
    authors: [
        { id: "ALCAM1913", name: "Albert", last_name: "Camus" }
    ]
});

db.books.insertOne({ 
    title: "La peste", 
    release_year: [     
        new Date("1947-01-01").getFullYear()
    ], 
    category: "Novela", 
    authors: [
        { id: "ALCAM1913", name: "Albert", last_name: "Camus" }
    ]
});

db.books.insertOne({ 
    title: "El mito de Sísifo", 
    release_year: [     
        new Date("1942-01-01").getFullYear()
    ], 
    category: "Novela", 
    authors: [
        { id: "ALCAM1913", name: "Albert", last_name: "Camus" }
    ]
});

db.books.insertOne({ 
    title: "El Anticristo", 
    release_year: [     
        new Date("1895-01-01").getFullYear()
    ], 
    category: "Filosofía", 
    authors: [
        { id: "FRIE1844", name: "Friedrich", last_name: "Nietzsche" }
    ]
});

db.books.insertOne({ 
    title: "Voluntad de poder", 
    release_year: [     
        new Date("1901-01-01").getFullYear()
    ], 
    category: "Filosofía", 
    authors: [
        { id: "FRIE1844", name: "Friedrich", last_name: "Nietzsche" }
    ]
});

db.books.insertOne({ 
    title: "Why I Am So Clever", 
    release_year: [     
        new Date("1922-01-01").getFullYear()
    ], 
    category: "Filosofía", 
    authors: [
        { id: "FRIE1844", name: "Friedrich", last_name: "Nietzsche" }
    ]
});

db.books.insertOne({ 
    title: "Hamlet", 
    release_year: [
        new Date("1609-01-01").getFullYear()
    ], 
    category: "Tragedia", 
    authors: [
        { id: "WISH1564", name: "William", last_name: "Shakespeare" }
    ]
});

db.books.insertOne({ 
    title: "Romeo y Julieta", 
    release_year: [
        new Date("1597-01-01").getFullYear()
    ], 
    category: "Amor romántico", 
    authors: [
        { id: "WISH1564", name: "William", last_name: "Shakespeare" }
    ]
});


db.books.insertOne({ 
    title: "Macbeth", 
    release_year: [
        new Date("1606-01-01").getFullYear()
    ], 
    category: "Tragedia", 
    authors: [
        { id: "WISH1564", name: "William", last_name: "Shakespeare" }
    ]
});


db.books.insertOne({ 
    title: "Otelo", 
    release_year: [
        new Date("1604-11-01").getFullYear(),
    ],
    category: "Tragedia", 
    authors: [
        { id: "WISH1564", name: "William", last_name: "Shakespeare" },
        { id: "FRIE1844", name: "Friedrich", last_name: "Nietzsche" }
    ]
});

// ------- Update actions ------- //

// 1. Add a date of death to one Author
db.authors.updateOne({ name: "Albert" }, { $set: { date_death: new Date("1960-01-04") } });

// 2. Add a new release year to a book
db.books.updateOne({ title: "Otelo" }, { $push: { release_year: new Date("2020-01-01").getFullYear() } });

// 3. Change the title of a book adding (“New Edition”)
db.books.updateOne({ title: "Macbeth" }, [{ $set: { title: { $concat: [ "$title", " New Edition" ] } } }], { multi: true });


// ------- Select actions ------- //

// 1. Select all books
db.books.find({}).pretty();

// 2. Select all books for a given category
db.books.find({ category: "Tragedia"}).pretty();

// 3. Select all books published before 2002
db.books.find({ release_year: {$lt: 2002}}).pretty();

// 4. Select all books with more than one author
db.books.find( { $where: "this.authors.length > 1" } ).pretty();

// 5. Select all authors
db.authors.find({}).pretty();

// 6. Select all death authors
db.authors.find({ date_death: { $exists: true }}).pretty();

// 7. Select all authors born before 1990
db.authors.find({ date_birth: {$lt: new Date("1990-01-01")}}).pretty();

// 8. Select all authors from a given country
db.authors.find({ country: "England" }).pretty();

// ------- Delete actions ------- //

// 1. Eliminate all the books for a given author 
db.books.deleteMany({ "authors.id": "WISH1564" });

// 2. Eliminate all the death authors
db.authors.deleteMany({ date_death: { $exists: true } });
