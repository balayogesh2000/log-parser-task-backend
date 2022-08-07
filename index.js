const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const router = require("./routes/logParseRoutes");
app.use(express.json());
app.use("/", router);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on the port ${port}`));
