const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const keys = require("./config/keys");
require("./models/user");
require("./services/passport");

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

app.use(bodyParser.json());

app.use(

    cookieSession({

        maxAge: 30 * 24 * 60 * 60 * 1000,   // 30 days in milliseconds
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {

    app.use(express.static("client/build")); // express will serve up production assets like main.js

    const path = require("path");
    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); // express will serve index.html if it doesn't recognize the route
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Express server listening on port", PORT));

