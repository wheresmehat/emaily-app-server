const passport = require("passport");

module.exports = (app) => {

    app.get(
    
        "/auth/google",

        passport.authenticate("google", {

            scope: ["profile", "email"],
            //prompt: 'select_account'  // if logging back in skips google's select user prompt and goes straight back into the app enable this option
        })
    );  

    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {

        res.redirect("/surveys");
    });

    app.get("/api/logout", (req, res) => {

        req.logout();
        res.redirect("/");
    });

    app.get("/api/current_user", (req, res) => {
        
        res.send(req.user);

    });
};

