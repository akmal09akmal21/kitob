import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const SingleBook = () => {
    const {id} = useParams()
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(`http://localhost:5000/books/${id}`);
      setBook(res.data.oneBook);
    

    };

    fetchBook();
  }, []);

  return (
    <div>
        
      {book ? (
        

<div className="container  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.author.name}</h5>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.author.biography}</p>
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.category.name}</h5>

    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.category.description}</p>
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.publishedYear}</h5>
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.summary}</h5>

    <Link to="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </Link>
</div>

      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleBook;
