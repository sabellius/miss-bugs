import express from "express";
import routes from "./routes/index.js";
const app = express();

app.use(express.json());
app.use("/", routes);
app.listen(3030, () => console.log("Server ready at port 3030"));
