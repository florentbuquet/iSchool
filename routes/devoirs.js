var express = require('express');
var router = express.Router();

/* GET classes listing. */
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query( 'SELECT devoirs.* FROM devoirs inner join classes on ( devoirs.classe_id = classes.id ) where classes.user_id=?', [ req.user.id ], function(err, rows) {

      res.status(200).send(rows);

      // And done with the connection.
      connection.release();

      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

module.exports = router;
