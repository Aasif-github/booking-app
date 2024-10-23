import express from "express";
import path from "path";

const app = express();

app.get("/test", (req, res) => {
    res.send("Frontend Server");
});

// attact to static file for frontend
app.use(express.static("public"));    

// Listen for connections
const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
})