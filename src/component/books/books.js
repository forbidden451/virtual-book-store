import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './books.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [harryPotterResponse, sherlockHolmesResponse] = await Promise.all([
          axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter`),
          axios.get('https://www.googleapis.com/books/v1/volumes?q=sherlock+holmes'),
        ]);

        const harryPotterBooks = harryPotterResponse.data.items;
        const sherlockHolmesBooks = sherlockHolmesResponse.data.items;

        // Combine both sets of books into a single array
        const allBooks = [...harryPotterBooks, ...sherlockHolmesBooks];
        setBooks(allBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
      );
      const searchResults = response.data.items;
      setBooks(searchResults);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  return (
    <div>
      <h1>All Books</h1>
      <input
        type="text"
        placeholder="Search for books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginRight: '10px' }}
      />

      {/* Search button */}
      <button onClick={handleSearch}>Search</button>

      <ul className="books-list">
        {books.map((book) => (
          <li key={book.id}>
            <img
              className="book-image"
              src={book.volumeInfo.imageLinks?.smallThumbnail}
              alt={book.volumeInfo.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
