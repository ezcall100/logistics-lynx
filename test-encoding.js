import fetch from 'node-fetch';

const testPayload = {
  text: "Hello — é ñ ü λ 🚀",
  message: "Testing UTF-8 encoding with special characters"
};

async function runTest() {
  try {
    console.log('🧪 Testing MCP API encoding...');
    console.log('📤 Sending payload:', testPayload);
    
    const res = await fetch('http://localhost:3001/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(testPayload),
    });

    const data = await res.text();
    console.log('📥 Raw Response:', data);
    console.log('📊 Response Headers:', Object.fromEntries(res.headers.entries()));

    try {
      const json = JSON.parse(data);
      console.log('✅ JSON Parsed:', json);
      
      // Verify encoding
      if (json.data && json.data.text === testPayload.text) {
        console.log('🎉 ENCODING TEST PASSED: Characters match exactly!');
      } else {
        console.log('❌ ENCODING TEST FAILED: Characters do not match');
        console.log('Expected:', testPayload.text);
        console.log('Received:', json.data?.text);
      }
    } catch (err) {
      console.error('❌ JSON Parsing Error:', err);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

runTest();
