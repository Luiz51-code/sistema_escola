app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sistema-de-escola.vercel.app",
      "https://bootleg-detector-clad.ngrok-free.dev",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
    ],
    credentials: true,
  })
);