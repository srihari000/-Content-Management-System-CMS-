// dbInit.js
const sequelize = require('./config/database');
const Post = require('./models/post');
const Page = require('./models/page');

(async () => {
    await sequelize.sync({ force: true });
    console.log("Database synced!");
})();
