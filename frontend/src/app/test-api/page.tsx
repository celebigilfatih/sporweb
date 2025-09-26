'use client';

import { useState } from 'react';

export default function TestAPI() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testAxios = async () => {
    setLoading(true);
    setResult('Testing axios...');
    
    try {
      const { newsService } = await import('@/services/news.service');
      const data = await newsService.getAll();
      
      setResult(`Axios Success! Received ${data.length} news items. First item: ${JSON.stringify(data[0], null, 2)}`);
    } catch (error) {
      console.error('Axios error:', error);
      setResult(`Axios Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
      
      <div className="space-y-4 mb-8">
        <button 
          onClick={testAxios}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Axios Service
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Result:</h2>
        <pre className="whitespace-pre-wrap text-sm">{result}</pre>
      </div>
    </div>
  );
}