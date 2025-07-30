export default function SimpleTestPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Device Groups Simple Test</h1>
      <p className="text-gray-600">
        This is a simple test page to verify that routing to /device-groups/simple works correctly.
      </p>
      <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
        <p className="text-green-800">
          ✅ If you can see this page, the routing is working correctly!
        </p>
      </div>
    </div>
  );
} 