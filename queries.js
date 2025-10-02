// the database of the bookstore
// insert_books.js
db.books.insertMany([
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    genre: "Programming",
    published_year: 1999,
    price: 45.99,
    in_stock: true,
    pages: 352,
    publisher: "Addison-Wesley"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    published_year: 2008,
    price: 39.99,
    in_stock: true,
    pages: 464,
    publisher: "Prentice Hall"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 15.99,
    in_stock: false,
    pages: 328,
    publisher: "Secker & Warburg"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    published_year: 1960,
    price: 18.50,
    in_stock: true,
    pages: 281,
    publisher: "J.B. Lippincott & Co."
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "History",
    published_year: 2011,
    price: 22.99,
    in_stock: true,
    pages: 443,
    publisher: "Harper"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    published_year: 1925,
    price: 12.99,
    in_stock: false,
    pages: 218,
    publisher: "Charles Scribner's Sons"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    published_year: 2018,
    price: 20.99,
    in_stock: true,
    pages: 320,
    publisher: "Penguin Random House"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Self-Help",
    published_year: 2016,
    price: 21.99,
    in_stock: true,
    pages: 304,
    publisher: "Grand Central Publishing"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    price: 14.99,
    in_stock: false,
    pages: 310,
    publisher: "George Allen & Unwin"
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    published_year: 1997,
    price: 25.99,
    in_stock: true,
    pages: 223,
    publisher: "Bloomsbury"
  }
]);
// Example queries
// 1. finds books by genre
db.books.find({ genre: "Fantasy" });

// 2. find books by a specific year
db.books.find({ published_year: { $gt: 2000 } });

// 3. find books by an author
db.books.find({ author: "George Orwell" });

// 4. updating the price of a book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 17.99 } }
);
// 5. deleting a book from the collection
db.books.deleteOne({ title: "The Great Gatsby" });

/*
  ADVANCED QUERIES
 */

  // 1. find books in stock and published after 2010
  db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } }
);

// 2. projecting the return field of author, title, and price

db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
);

//3.sorting by price
   /* ascending (cheapest first) */
  db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
);
    /* descending (most expensive first) */
   db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 })
        .sort({ price: -1 });

// 4. pagination (5 books per page) {limit and skip}
    /* page 1 ( first 5 books)*/
    db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 })
        .sort({ price: 1 })
        .limit(5)
        .skip(0);

    /* page 2 ( next 5 books)*/
    db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 })
        .sort({ price: 1 })
        .limit(5)
        .skip(5);

    /* aggregation pipeline */
    
    // 1. avarage price of books per genre
    db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      avgPrice: { $avg: "$price" },
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { avgPrice: -1 } // optional: most expensive genres first
  }
]);
    // 2. author with the most books
    db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
    $limit: 1
  }
]);
    // 3. Group books by publication decade and count them

    db.books.aggregate([
  {
    $group: {
      _id: { 
        decade: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] }
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { "_id.decade": 1 }
  }
]);


/* indexing */
 // 1. creating an index on title
 db.books.createIndex({ title: 1 })

 //2. Compound index on author and published_year

 db.books.createIndex({ author: 1, published_year: -1 })

 

        
