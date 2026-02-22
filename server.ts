import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Mock Database in memory
  let db = [
    {
      id: 'vtu-1',
      certificateId: '4MW22CS145',
      studentName: 'Mohammed Ali',
      degreeName: 'Bachelor of Engineering',
      institution: 'VISVESVARAYA TECHNOLOGICAL UNIVERSITY, BELAGAVI',
      graduationYear: 2025,
      issueDate: '2025-07-20',
      status: 'active',
      semester: '6',
      resultStatus: 'PASS'
    },
    {
      id: 'vtu-2',
      certificateId: '4MW22CS183',
      studentName: 'VINYAS',
      degreeName: 'Bachelor of Engineering',
      institution: 'VISVESVARAYA TECHNOLOGICAL UNIVERSITY, BELAGAVI',
      graduationYear: 2025,
      issueDate: '2025-07-20',
      status: 'active',
      semester: '6',
      resultStatus: 'PASS'
    },
    {
      id: 'puc-1',
      certificateId: '661281',
      studentName: 'SHREESHA',
      degreeName: 'Pre-University Certificate',
      institution: 'JNANAGANGA PU COLLEGE',
      graduationYear: 2022,
      issueDate: '2022-04-15',
      status: 'active',
      semester: 'PUC2',
      resultStatus: 'DISTINCTION'
    }
  ];

  // API Routes
  app.get("/api/records", (req, res) => {
    res.json(db);
  });

  app.post("/api/records", (req, res) => {
    const newRecord = req.body;
    db = [newRecord, ...db];
    res.status(201).json(newRecord);
  });

  app.delete("/api/records/:id", (req, res) => {
    const { id } = req.params;
    db = db.filter(r => r.id !== id);
    res.status(204).send();
  });

  app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    // In a real app, use environment variables and hashed passwords
    if (username === 'shreesha' && password === 'password') {
      res.json({ success: true, token: 'mock-jwt-token' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
