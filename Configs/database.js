const mongoose = require('mongoose');
const dbName = process.env.DB_NAME;

//BUILD A CONNECTION
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName,
  })
  .then(() => {
    console.log(
      chalk.greenBright(
        `${chalk.white.bold(dbName)} database connected successfully ${chalk.yellow.bold(':)')} \n`
      )
    );
  })
  .catch(err => console.log('error', err));

module.exports.mongoose = mongoose;
