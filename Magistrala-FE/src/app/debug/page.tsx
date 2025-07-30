'use client';

export default function DebugPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'red', fontSize: '24px' }}>Debug Page</h1>
      
      <div style={{ margin: '20px 0', padding: '20px', border: '2px solid blue', backgroundColor: '#f0f0f0' }}>
        <h2>CSS Test</h2>
        <p>If you can see this styled box, basic CSS is working.</p>
        <p>If this text is styled, inline styles are working.</p>
      </div>
      
      <div className="bg-red-500 text-white p-4 rounded">
        <h3>Tailwind Test</h3>
        <p>If this has a red background and white text, Tailwind is working.</p>
      </div>
      
      <div className="mt-4 p-4 border border-gray-300 rounded">
        <h3>Component Test</h3>
        <p>Testing basic HTML elements:</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
        <button style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px' }}>
          Test Button
        </button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e8f5e8', border: '1px solid #4caf50' }}>
        <h3>Status</h3>
        <p>✅ Basic HTML rendering: Working</p>
        <p>✅ Inline styles: Working</p>
        <p>❓ Tailwind CSS: Check the red box above</p>
        <p>❓ Component styling: Check the gray box above</p>
      </div>
    </div>
  );
} 