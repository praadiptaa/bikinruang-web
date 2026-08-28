const routes = [
  '/',
  '/projects',
  '/projects/go-go-glow-neon-playground',
  '/services',
  '/about',
  '/clients',
  '/stories',
  '/stories/inside-the-workshop-3d-cad-to-stage-structures',
  '/contact',
  '/admin/login',
  '/admin/dashboard',
  '/admin/projects',
  '/admin/projects/new',
  '/admin/categories',
  '/admin/services',
  '/admin/clients',
  '/admin/news',
  '/admin/media',
  '/admin/social',
  '/admin/inquiries'
];

async function run() {
  console.log('Testing Bikinruang web routes...\n');
  let pass = 0;
  let fail = 0;
  for (const r of routes) {
    try {
      const url = `http://localhost:3000${r}`;
      const res = await fetch(url);
      if (res.status === 200) {
        console.log(`[PASS 200] ${r}`);
        pass++;
      } else {
        console.error(`[FAIL ${res.status}] ${r}`);
        fail++;
      }
    } catch (err) {
      console.error(`[ERR] ${r}:`, err.message);
      fail++;
    }
  }
  console.log(`\nSummary: ${pass} passed, ${fail} failed.`);
}

run();
