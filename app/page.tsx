// pages/index.js
"use client"

import { useState } from 'react';

const Home = () => {
  const [response, setResponse] = useState('');

  const handleCreate = async () => {
    const newIssue = {
      id: 1,
      title: 'New Issue',
      description: 'This is a new issue.'
    };

    try {
      const res = await fetch('/api/issues/create', {
        method: 'POST',
        body: JSON.stringify(newIssue),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();
      setResponse(`Created Issue: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error(error);
      setResponse('Error creating issue');
    }
  };

  const handleRead = async () => {
    try {
      const res = await fetch('/api/issues/read');
      const data = await res.json();
      setResponse(`Read Issue: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error(error);
      setResponse('Error reading issue');
    }
  };

  const handleUpdate = async () => {
    const updatedIssue = {
      id: 1,
      title: 'Updated Issue',
      description: 'This issue has been updated.'
    };

    try {
      const res = await fetch('/api/issues/update', {
        method: 'PUT',
        body: JSON.stringify(updatedIssue),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();
      setResponse(`Updated Issue: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error(error);
      setResponse('Error updating issue');
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch('/api/issues/delete', {
        method: 'DELETE'
      });

      const data = await res.json();
      setResponse(`Deleted Issue: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error(error);
      setResponse('Error deleting issue');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">REST API Client</h1>
      <button
        onClick={handleCreate}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full py-2 px-4 mb-2 flex items-center space-x-2"
      >
        <span>Create Issue</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
      <button
        onClick={handleRead}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full py-2 px-4 mb-2 flex items-center space-x-2"
      >
        <span>Read Issue</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 9l6 6 6-6"
          />
        </svg>
      </button>
      <button
        onClick={handleUpdate}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full py-2 px-4 mb-2 flex items-center space-x-2"
      >
        <span>Update Issue</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 transform rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 9l6 6 6-6"
          />
        </svg>

      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full py-2 px-4 flex items-center space-x-2"
      >
        <span>Delete Last Issue</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <p className="mt-4">{response}</p>
    </div>
  );
};

export default Home;
