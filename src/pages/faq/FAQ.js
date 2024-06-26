import React, { useState } from 'react';
import axios from 'axios';

const FAQ = () => {
  const [faq, setFaq] = useState({
    question: '',
    answer: '',
  });

  const baseUrl = "https://it-issue-tracking-api.onrender.com/api";
  const [faqs, setFaqs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaq({ ...faq, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/FAQ/createFaq`, faq);
        setFaqs([...faqs, response.data.faq]);
        alert('FAQ added successfully.');
        window.location.reload()
      
    } catch (error) {
      setErrorMessage('Failed to add FAQ. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='flex flex-col items-center text-gray-800 px-6' style={{ width: "600px" }}>
      <h2 className='text-2xl font-bold mb-4 dark:text-white'>Add FAQ</h2>
      <form className='w-full max-w-md' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-left mb-2 dark:text-white' htmlFor='question'>
            Question:
          </label>
          <input
            type='text'
            id='question'
            name='question'
            value={faq.question}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-left mb-2 dark:text-white' htmlFor='answer'>
            Answer:
          </label>
          <textarea
            id='answer'
            name='answer'
            value={faq.answer}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-sky-700 mt-3 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Add FAQ
        </button>
        {successMessage && <p className='text-green-500 mt-2'>{successMessage}</p>}
      </form>
      {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}
    </div>
  );
};

export default FAQ;
