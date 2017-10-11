var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: "hookemailyapp2345qwertz" }, function(err, tunnel) {
  console.log('LT running')
});


// if webhook doesn't work concurrently run it in a separate terminal: npm run webhook

/*

your localtunnel url: https://hookemailyapp2345qwertz.localtunnel.me

our route in sendgrid settings-mail settings development: https://hookemailyapp2345qwertz.localtunnel.me/api/surveys/webhooks

our route in sendgrid settings-mail settings development: https://hookemailyapp2345qwertz.localtunnel.me/api/surveys/webhooks

*/