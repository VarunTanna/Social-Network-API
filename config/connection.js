const { connect, connection } = require('mongoose');

connect("mongodb://localhost/social-media=api",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

  module.exports = connection;