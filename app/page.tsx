"use client";
import { useEffect, useState } from 'react';

const Home = () => {
  const [response, setResponse] = useState('');
  const [issues, setIssues] = useState([]);

  const handleCreate = async () => {
    const newIssue = {
      title: 'New Issue',
      description: 'This is a new issue.',
    };

    try {
      const res = await fetch('/api/issues/create', {
        method: 'POST',
        body: JSON.stringify(newIssue),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setResponse(`Created Issue: ${JSON.stringify(data)}`);
      handleRead(); // Fetch and display issues after creating
    } catch (error) {
      console.error(error);
      setResponse('Error creating issue');
    }
  };

  const handleRead = async () => {
    try {
      const res = await fetch('/api/issues/read');
      const data = await res.json();
      console.log(data);

      // Check if the response is an array of issues
      if (Array.isArray(data)) {
        // @ts-ignore
        setIssues(data); // Store the array of issues in state
        setResponse('Read Issues');
      } else {
        setResponse('Error: Data format is not as expected');
      }
    } catch (error) {
      console.error(error);
      setResponse('Error reading issues');
    }
  };

  const handleUpdate = async (issueId: number) => {
    const updatedIssue = {
      title: 'Updated Issue',
      description: 'This issue has been updated.',
    };

    try {
      const res = await fetch(`/api/issues/${issueId}/update`, {
        method: 'PUT',
        body: JSON.stringify(updatedIssue),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setResponse(`Updated Issue: ${JSON.stringify(data)}`);
      handleRead(); // Fetch and display issues after updating
    } catch (error) {
      console.error(error);
      setResponse('Error updating issue');
    }
  };


  const handleDelete = async (issueId: number) => {
    try {
      const res = await fetch(`/api/issues/${issueId}/delete`, {
        method: 'DELETE',
      });

      const data = await res.json();
      setResponse(`Deleted Issue: ${JSON.stringify(data)}`);
      handleRead(); // Fetch and display issues after deleting
    } catch (error) {
      console.error(error);
      setResponse('Error deleting issue');
    }
  };

  useEffect(() => {
    // Load issues when the component mounts
    handleRead();
  }, []);

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
      <div className="mt-6">
        {/* Render rounded boxes for each issue */}
        {issues.map((issue: any) => (
          <div key={issue.id} className="rounded-lg border p-4 mb-4">
            <h2 className="text-lg font-semibold">{issue.title}</h2>
            <p className="text-gray-600">{issue.description}</p>
            <div className='flex'>
              <button
                onClick={() => handleUpdate(issue.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full py-2 px-4 mt-2 flex items-center space-x-2"
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
                onClick={() => handleDelete(issue.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full py-2 px-4 mt-2 flex items-center space-x-2"
              >
                <span>Delete Issue</span>
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
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4">{response}</p>
    </div>
  );
};

export default Home;
