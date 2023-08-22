if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const routerUser = require("./routers/user");
const routerApp = require("./routers/app");

const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", routerUser);
app.use("/apps", routerApp);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

module.exports = app;