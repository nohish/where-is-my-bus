
//   const express = require('express');
// const path = require('path');

// const app = express();
// const hostname = '127.0.0.1';
// const port = 3000;

// // Middleware to parse form data (REQUIRED for POST requests)
// app.use(express.urlencoded({ extended: true }));

// // Serve frontpage at root
// app.get('/', (req, res) => {
//     const frontpagePath = path.join(__dirname, 'Frontpage.html');
//     res.sendFile(frontpagePath);
// });

// // HANDLE TRACK BUTTON FORM SUBMISSION
// app.post('/track', (req, res) => {
//     const busId = req.body.bus?.trim().toUpperCase() || '';
    
//     console.log(`Track request for bus: ${busId}`);
    
//     // Validate bus ID (min 3 chars)
//     if (!busId || busId.length < 3) {
//         return res.redirect('/?error=invalid');
//     }
    
//     // SUCCESS: Redirect to routemap with bus ID
//     res.redirect(`/routmap?bus=${busId}`);
// });

// // Serve routmap page (with bus ID query param)
// app.get('/routmap', (req, res) => {
//     const busId = req.query.bus || 'UNKNOWN';
//     console.log(`Serving routmap for bus: ${busId}`);
    
//     const routmapPath = path.join(__dirname, 'routemap.html');
//     res.sendFile(routmapPath);
// });

// // 404 for all other routes
// app.use((req, res) => {
//     res.status(404).send(`
//         <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; background:#667eea;">
//             <h1 style="color:white; font-size:3em;">🚫 404</h1>
//             <p style="color:white; font-size:1.2em;">Page not found</p>
//             <a href="/" style="margin-top:20px; padding:12px 24px; background:#ff6b6b; color:white; text-decoration:none; border-radius:25px;">← Back to Bus Tracker</a>
//         </div>
//     `);
// });

// // Start server
// app.listen(port, hostname, () => {
//     console.log(`🚀 Bus Tracker Server running at http://${hostname}:${port}/`);
//     console.log(`📱 Test flow: / → enter BUS001 → Track → /routmap?bus=BUS001`);
// });
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// ✅ Serve all static files from 'public'
app.use(express.static(path.join(__dirname, 'Public')));

// ✅ Handle Track Form (ONLY dynamic route needed)
app.post('/track', (req, res) => {
    const busId = req.body.bus?.trim().toUpperCase();

    if (!busId || busId.length < 3) {
        return res.redirect('/frontpage.html');
    }

    // Redirect to routemap page with bus ID
    res.redirect(`/routemap.html?bus=${busId}`);
});

// Optional: fallback to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
