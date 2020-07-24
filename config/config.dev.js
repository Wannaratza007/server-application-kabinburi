var _port = 3000;
module.exports = {
    // hosturl: 'https://localhost:' + _port,
    // port: _port,
    // ssl_key: './ssl/privatekey.key',
    // ssl_cert: './ssl/dits-cert.crt',
    // secret: 'truck_queue_secret',
    // line_notify_url: 'http://wmsdemo.hili.asia/NotifyCenter/LineNotify/Send?site=ebxml&module=import&msg=',
    // NODE_ENV: "development", //"production";  //"development"
    // logger: {
    //     format: "tiny"
    // },
    database: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'myproject'
        }
    },

    // google: {
    //     clientID: '349554955189-tssnk7eo8lta5nne2jq4j7ljs20kej8l.apps.googleusercontent.com',
    //     clientSecret: 'OaMmbR2_RRKxQxdU3LhiD4Sn',
    //     callbackURL: 'https://localhost:3000/auth/google/callback',
    // }
};
