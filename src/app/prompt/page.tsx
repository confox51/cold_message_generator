'use client';

import { useState } from 'react';

export default function PromptPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileContent, setFileContent] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('application/pdf') && !file.type.match('application/msword') && 
        !file.type.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      alert('Please upload a PDF or Word document');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      setFileContent(data.text);
      setPrompt(prev => prev + '\n\nContent from uploaded file:\n' + data.text);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to process file');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          fileContent 
        }),
      });
      
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Prompt Interface</h1>
          <a 
            href="/" 
            className="rounded-full bg-foreground text-background px-6 py-2 hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            Email Generator
          </a>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="file" className="block text-sm font-medium mb-1">
              Upload Document (PDF or Word)
            </label>
            <input
              type="file"
              id="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-1">
              Enter your prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 min-h-[200px]"
              placeholder="Enter your prompt here... The uploaded file content will be appended automatically."
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-foreground text-background px-6 py-2 hover:bg-[#383838] dark:hover:bg-[#ccc] disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>

        {response && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Response:</h2>
            <div className="p-4 border rounded-md dark:bg-gray-800 dark:border-gray-700 whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 