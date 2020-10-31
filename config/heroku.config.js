// Important keys here
// heroku git:remote -a <your_heroku_app_name>
// heroku config:set <variable_name=value>
// heroku open --app YOURAPPNAME

module.exports = {
    apiKeyID: process.env.x-rapidapi-host,
    apiKeySecret: process.env.x-rapidapi-key
};