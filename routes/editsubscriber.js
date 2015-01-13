var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1']});
client.connect(function(err, result){
	console.log('editsubscriber: cassandra connected');
});


var getSubscriberById = 'SELECT * FROM people.subscribers WHERE id = ?';

/* GET users listing. */
router.get('/:id', function(req, res) {
	client.execute(getSubscriberById,[req.params.id], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.render('editsubscriber', {
				id: result.rows[0].id,
				email: result.rows[0].email,
				first_name: result.rows[0].first_name,
				last_name: result.rows[0].last_name,
			})
		}
	});
});


/* POST Edit Subscriber */
router.post('/', function(req, res){
	var upsertSubscriber = 'INSERT INTO people.subscribers(id, email, first_name, last_name) VALUES(?,?,?,?)';

	client.execute(upsertSubscriber, [req.body.id, req.body.email, req.body.first_name, req.body.last_name],
		function(err, result){
			if(err){
			res.status(404).send({msg: err});
		} else {
			console.log('Subscriber Added');
			res.redirect('/');
		}
		});
});

module.exports = router;
