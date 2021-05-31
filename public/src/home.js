function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let totalBorrowCount = 0;
  let borrowCounting = books.reduce((acc, book) => {
    if (book.borrows.some((borrow) => borrow.returned === false)) totalBorrowCount++; 
    return acc;
  });

  return totalBorrowCount;
}

//helper function to truncate an array based on a maximum amount of items permitted
function truncateArray(array, maxValue){
  let truncatedArray = [];
  for (let i = 0; i < maxValue; i++){
    truncatedArray[i] = array[i];
  };
  return truncatedArray;
}

function getMostCommonGenres(books) {
  //initialize an array into which the genre count objects can be placed
  let genreCount = [];

  //scan through the books array
  let scanForGenres = books.forEach((book) => {
    let bookGenre = book.genre;

    //have a boolean track whether or not the genre had been added to genreCount
    let alreadyNoted = false;

    //check the genreCount array to see if the genre was added, and up the count if so
    let checkGenres = genreCount.forEach((genre) => {
      if (genre.name === bookGenre){
        genre.count++;
        alreadyNoted = true;
        return;
      }
    });
    //only add a new object if genre was not already noted (default count: 1)
    if(!alreadyNoted) genreCount.push({"name":book.genre, "count":1});
    return;
  })

  //sort the objects from most to least common
  let sortedGenres = genreCount.sort((genre1,genre2) => {
    return (genre2.count - genre1.count);
  });
  console.log(`this is sorted genres: ${sortedGenres}`);

  //if array.length <= 5, return array
  if (sortedGenres.length <= 5) return sortedGenres;

  //else, let truncatedArray = [arrayEleemnts [0]-[4]]
  return truncateArray(sortedGenres, 5);
}

function getMostPopularBooks(books) {
  //scan through books array
  let booksByPopularity = [];

  //for each book...
  books.forEach((book) => {
    //if it is already in the booksByPopularity array, count++
    let alreadyNoted = false;
    let checkIfNoted = booksByPopularity.forEach((bookObject) => {
      if(bookObject.name === book.title){
        bookObject.count++;
        alreadyNoted = true;
        return;
      }
    });

    //if the book is NOT in the booksByPopularity array, add it with relevant borrow amt
    if(!alreadyNoted){
      booksByPopularity.push({"name": book.title, "count": book.borrows.length});
      return;
    };
  });

  //sort booksByPopularity from greatest to least
  let sortedBooksByPopularity = booksByPopularity.sort((book1,book2) => {
    return (book2.count - book1.count);
  });

  //if array.length <= 5, return array
  if (sortedBooksByPopularity.length <=5) return sortedBooksByPopularity;

  //else, let truncatedArray = [array elements 0-4]
  return truncateArray(sortedBooksByPopularity, 5);
}

function getMostPopularAuthors(books, authors) {
  let authorCount = [];
  //scan through the books array
  books.forEach((book) => {
    //boolean tracker of whether or not author has been seen before
    let alreadyNoted = false;

    //initialize variable for easy access to current book's author object
    let bookAuthorId = book.authorId;
    let bookAuthor = authors.find((author) => author.id === bookAuthorId);

    //code to update authorCount if author is already present in array
    let checkIfNoted = authorCount.forEach((author) => {
      if (author.name === `${bookAuthor.name.first} ${bookAuthor.name.last}`){
        alreadyNoted = true;
        author.count += book.borrows.length;
        return;
      }
    });

    //code to update authorCount if author is not present in array
    if(!alreadyNoted) {
      authorCount.push(
      {"name": `${bookAuthor.name.first} ${bookAuthor.name.last}`, "count": book.borrows.length}
      );
      return;
    };
  })

  //sort the objects from most to least common
  let sortedAuthors = authorCount.sort((author1,author2) => {
    return (author2.count - author1.count);
  });

  //if array.length <= 5, return array
  if (sortedAuthors.length <= 5) return sortedAuthors;

  //else, let truncatedArray = [arrayEleemnts [0]-[4]]
  return truncateArray(sortedAuthors, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
