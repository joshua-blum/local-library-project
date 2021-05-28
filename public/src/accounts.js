function findAccountById(accounts, id) {
  //returns account object with matching id
  let matchingAccount = accounts.find((account) => account.id === id);
  return matchingAccount;
}

function sortAccountsByLastName(accounts) {
  let alphabeticallySortedAccounts = accounts.sort((account1,account2) => 
    account1.name.last > account2.name.last ? 1: -1);
  return alphabeticallySortedAccounts;
}

function getTotalNumberOfBorrows(account, books) {
  //It returns a _number_ that represents the number of times the account's ID appears in any book's `borrow` array.
  let totalBorrows = 0;
  //scan through each book
  let scanForBorrows = books.find((book) => {
    //in each book object, there is a borrows array of borrow objects
    for(let i = 0; i < book.borrows.length; i++){
      //if a given borrow object has an id equal to the account id, add +1 to the totalBorrows variable
      if(book.borrows[i].id === account.id) 
        totalBorrows++;
      };
    }
  );
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  //creates an array of book objects of the books the account borrowed
    let booksBorrowed = books.map((book) => {

      //first establish a pointer to the author of the book
      let bookAuthor = authors.find((author) => author.id === book.authorId);
      if(book.borrows.some((borrow) => (borrow.id === account.id) && borrow.returned === false))
        return {...book, "author":{...bookAuthor}};
    });

    //remove undefined objects from array
    let cleanBooksBorrowed = booksBorrowed.filter((bookObject) => bookObject !== undefined);
  
  return cleanBooksBorrowed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
