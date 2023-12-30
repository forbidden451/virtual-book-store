// App.js

import React, { useState, useEffect } from 'react';
import Navbar from './component/navbar/navbar';
import BookList from './component/books/books';
import ReactDOM from 'react-dom';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchInitialBooks = async () => {
      try {
        const response1 = await fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter');
        const data1 = await response1.json();

        const response2 = await fetch('https://www.googleapis.com/books/v1/volumes?q=sherlock+holmes');
        const data2 = await response2.json();

        // Combine and set the books from both API calls
        setBooks([...data1.items, ...data2.items]);
      } catch (error) {
        console.error('Error fetching initial books:', error);
      }
    };

    fetchInitialBooks();
  }, []);

  return (
    <div>
      <Navbar />
      <BookList books={books} />
    </div>
  );
};

ReactDOM.render(<App/>,document.getElementById("root"));
