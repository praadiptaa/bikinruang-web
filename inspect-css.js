async function test() {
  try {
    const res = await fetch('http://localhost:3000/');
    const html = await res.text();
    const cssMatches = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)];
    
    for (const match of cssMatches) {
      const cssUrl = match[1].startsWith('http') ? match[1] : 'http://localhost:3000' + match[1];
      const cssRes = await fetch(cssUrl);
      const cssText = await cssRes.text();
      console.log(`CSS length: ${cssText.length} bytes`);
      
      const checks = ['#111111', '#f5f3ef', '#ff5a36', '#d8ff36', '#2d5bff', 'marquee', 'bg-workshop-grid'];
      checks.forEach(token => {
        console.log(`Token '${token}': ${cssText.toLowerCase().includes(token.toLowerCase()) ? 'FOUND ✓' : 'MISSING ✗'}`);
      });
    }
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
