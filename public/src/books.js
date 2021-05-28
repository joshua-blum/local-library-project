function findAuthorById(authors, id) {
  let authorMatch = authors.find((author) => author.id === id);
  return authorMatch;
}

function findBookById(books, id) {
  let findBook = books.find((book) => book.id === id);
  return findBook;
}

function filterUndefinedOut(array){
  return array.filter((object) => object !== undefined);
}

function partitionBooksByBorrowedStatus(books) {
  //create an array that will be the parent of the rest of the arrays
  let partitionedArray = [];

  //creates an array of books loaned out
  booksLoanedOut = books.map((book) => {
    if(!(book.borrows.length === 0) 
      && book.borrows.some((borrow) => borrow.returned === false)
      )
    return book;
  });

  //creates an array of returned books
  booksReturned = books.map((book) => {
    if(!(book.borrows.length === 0) && book.borrows.every((borrow) => borrow.returned === true))
      return book;
  });

  //removes the undefined book objects from the filtered arrays
  partitionedArray[0] = filterUndefinedOut(booksLoanedOut); //booksLoanedOut.filter((book) => book !== undefined);
  partitionedArray[1] = filterUndefinedOut(booksReturned); //booksReturned.filter((book) => book !== undefined);

  return partitionedArray;
}

function getBorrowersForBook(book, accounts) {
  //scan through the borrows of the book
  let borrowsArray = book.borrows.map((borrow) => {
    //find the account that borrowed the book for that particular borrow
    let relevantAccount = accounts.find((account) => account.id === borrow.id);
    //return the updated borrow object
    return {...borrow, ...relevantAccount};
  });

  //truncate the array if it is greater than 10 borrowers
  if (borrowsArray.length > 10){
    let truncatedArray = [];
    for(let i = 0; i < 10; i++){
      truncatedArray[i] = borrowsArray[i];
    };
    return truncatedArray;
  }
  return borrowsArray;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
