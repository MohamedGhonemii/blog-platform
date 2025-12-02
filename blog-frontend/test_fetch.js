async function testFetch() {
  const url = 'http://localhost:8000/api/posts/?page=1&page_size=6';
  console.log('Testing URL:', url);
  
  try {
    // Test with different fetch options
    const options = [
      { cache: 'no-store' },
      { cache: 'no-store', headers: { 'Accept': 'application/json' } },
      { cache: 'no-store', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } },
      { 
        cache: 'no-store', 
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000'
        } 
      }
    ];
    
    for (let i = 0; i < options.length; i++) {
      console.log(`\n--- Test ${i + 1} ---`);
      console.log('Options:', JSON.stringify(options[i], null, 2));
      
      try {
        const response = await fetch(url, options[i]);
        console.log('Status:', response.status, response.statusText);
        console.log('Headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
          const text = await response.text();
          console.log('Response length:', text.length, 'chars');
          try {
            const data = JSON.parse(text);
            console.log('Parsed JSON, count:', data.count);
          } catch {
            console.log('Not JSON or parse error');
          }
        } else {
          console.log('Response not OK');
        }
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

testFetch();
