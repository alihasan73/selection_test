const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
const db = require("./models/");
const routes = require("./routes");

// db.sequelize.sync({ alter: true });

// app.use(cors());
// app.use(express.json());

app.use("/users", routes.userRoutes);
app.use("/post", routes.postRoutes);

app.listen(PORT, () => {
	console.log(`server is running on PORT: ${PORT}`);
});
