const mongoose = require("mongoose");
const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");

const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("survey");

module.exports = (app) => {

    app.get("/api/surveys/thanks", (req, res) => {

        res.send("Thanks for the feedback!");
    });

    app.post("/api/surveys/webhooks", (req, res) => {
        console.log("req.body", req.body);
        console.log("-----------------------");
        const events = _.map(req.body, (event) => {

            const pathName = new URL(event.url).pathname;
            const p = new Path("/api/surveys/:surveyId/:choice");

            const match = p.test(pathName);

            if (match) {

                return { 
                    email: event.email,
                    surveyId: match.surveyId,
                    choice: match.choice
                };
            }

        });

        const compactEvents = _.compact(events);

        const uniqueEvents = _.uniqBy(compactEvents, (event) => [event.email, event.surveyID].join());

        console.log(uniqueEvents);
        console.log("-----------------------");
        res.send({});

    });

    app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {

        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({

            title,
            subject,
            body,

            recipients: recipients.split(",").filter(email => {

                const emailTrimmed = email.trim(); 
                
                if (emailTrimmed !== "") {

                    return true;
                }
                
            }).map(email => ({ email })),

            _user: req.user.id,
            dateSent: Date.now()

        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {

            await mailer.send();
            await survey.save();

            req.user.credits -= 1;

            const user = await req.user.save();

            res.send(user);            
        }
        catch(err) {

            res.status(422).send(err);
        }


    });

};







