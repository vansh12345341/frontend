"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [outputs, setOutputs] = useState({});  

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data } = await axios.get('https://code-snippet-backend-df4u.onrender.com/submissions');
        setSubmissions(data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };





const handleRunCode = async (id, sourceCode, stdin, code_language) => {
  
    console.log(sourceCode, code_language)
    console.log(stdin);
    const base64SourceCode = btoa(encodeURIComponent(sourceCode).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
    const base64Stdin = btoa(unescape(encodeURIComponent(stdin)));
    var language_id;
    if(code_language === "C++"){
        language_id = 52
    }
    else if(code_language === "python")
    {
        language_id = 92
    }
    else if(code_language ==="Typescript"){
        language_id = 94
    }
    console.log(base64SourceCode, base64Stdin, language_id)

    try {
      const submissionOptions = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'da1ae12421msh4035fd6f0031809p16edadjsn0a6a810f00f9', 
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
        data: {
          language_id: language_id,
          source_code: base64SourceCode,
          stdin: base64Stdin,
        },
      };
  
      const submissionResponse = await axios.request(submissionOptions);
      const token = submissionResponse.data.token;
  
      // Second Request: Get the output using the token
      const resultOptions = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'X-RapidAPI-Key': 'da1ae12421msh4035fd6f0031809p16edadjsn0a6a810f00f9', // Use your actual RapidAPI Key
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      };
  
      setTimeout(async () => {
        try {
          const resultResponse = await axios.request(resultOptions);

          console.log(resultResponse);
          const output = atob(resultResponse.data.stdout || resultResponse.data.stderr );
          console.log("output", output)
          setOutputs(prev => ({ ...prev, [id]: output }));
        } catch (error) {
          console.error('Error fetching result:', error);
          setOutputs(prev => ({ ...prev, [id]: 'Error fetching result' }));
        }
      }, 5000); 
  
    } catch (error) {
      console.error('Error submitting code:', error);
      setOutputs(prev => ({ ...prev, [id]: 'Error submitting code' }));
    }
  };
  
  

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-5">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">Username</th>
            <th scope="col" className="py-3 px-6">Code Language</th>
            <th scope="col" className="py-3 px-6">STDIN</th>
            <th scope="col" className="py-3 px-6">Source Code Preview</th>
            <th scope="col" className="py-3 px-6">Submission Timestamp</th>
            <th scope="col" className="py-3 px-6">Output</th> {/* New Output column */}
            <th scope="col" className="py-3 px-6">Action</th> {/* Column for the "Run" button */}
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="py-4 px-6">{submission.username}</td>
              <td className="py-4 px-6">{submission.code_language}</td>
              <td className="py-4 px-6">{submission.stdin}</td>
              <td className="py-4 px-6">{submission.source_code_preview.substring(0, 100)}</td>
              <td className="py-4 px-6">{formatDate(submission.submission_timestamp)}</td>
              <td className="py-4 px-6">{outputs[submission.id]}</td> {/* Display output */}
              <td className="py-4 px-6">
                <button
                  onClick={() => handleRunCode(submission.id, submission.source_code_preview, submission.stdin, submission.code_language)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Run
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
