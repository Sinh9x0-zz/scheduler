module.exports = (function() {
	return {
		allEmployees: function(req, res) {
			var query = "SELECT * FROM employees JOIN employee_addresses ON employee_address_id = employee_addresses.id ";
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else {
					res.json(rows)
				}
			})
		},

		getOneEmployee: function(req, res) {
			var query = "SELECT * FROM employees JOIN employee_addresses ON employee_address_id = employee_addresses.id WHERE employees.id = " + req.params.id;
			connection.query(query, function(err, rows){
					if (err) 
						res.json(err)
					else 
						res.json(rows)
			});
		},

		addEmployee: function(req, res) {
			var post1 = {
				address1: req.body.address1, 
				address2: req.body.address2,
				city: req.body.city, 
				state: req.body.state,
				zip: req.body.zip,
				created_at: (new Date()).toISOString().substring(0, 19).replace('T', ' '), 
				updated_at: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
			}

			var query1 = connection.query('INSERT INTO employee_addresses SET ?', post1, function(err, result) {
				var post2 = {
					email: req.body.email, 
					password: req.body.password, 
					first_name: req.body.first_name,
					last_name: req.body.last_name, 
					phone_number: req.body.phone_number,
					user_level: 1,
					employee_address_id: result.insertId, 
					created_at: (new Date()).toISOString().substring(0, 19).replace('T', ' '), 
					updated_at: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
				};

				var query2 = connection.query('INSERT INTO employees SET ?', post2, function(err, result) {
					return res.json(result.insertId);
				});
			});			
		},

		updateAvailability: function(req, res){
			var errors = [];
			var post = {}
			if (req.body.days.mon) {post.mon = req.body.days.mon;} else {post.mon = false;}
			if (req.body.days.tue) {post.tue = req.body.days.tue;} else {post.tue = false;}
			if (req.body.days.wed) {post.wed = req.body.days.wed;} else {post.wed = false;}
			if (req.body.days.thu) {post.thu = req.body.days.thu;} else {post.thu = false;}
			if (req.body.days.fri) {post.fri = req.body.days.fri;} else {post.fri = false;}
			if (req.body.days.sat) {post.sat = req.body.days.sat;} else {post.sat = false;}
			if (req.body.days.sun) {post.sun = req.body.days.sun;} else {post.sun = false;}
			post.created_at = (new Date()).toISOString().substring(0, 19).replace('T', ' '); 
			post.updated_at = (new Date()).toISOString().substring(0, 19).replace('T', ' ');

			var query = connection.query('SELECT * FROM user_availability WHERE employee_id =' + req.body.id, function(err, result){
				if (result.length == 0) {
					post.employee_id = req.body.id;
					var insertQuery = connection.query('INSERT INTO user_availability SET ?', post, function(err, result){
						if (err)
							errors.push(err);
					})
				} else {
					var insertQuery = connection.query('UPDATE user_availability SET ? where employee_id =' + req.body.id, post, function(err, result){
						if (err)
							errors.push(err);
					})
				}
	
			});

			for (index in req.body.locations){
				if (req.body.locations[index]){	
					connection.query('INSERT INTO employee_locations SET ?', {employee_id: req.body.id, location_id: index}, function(err, result){
						if (err)
							errors.push(err);
					})
				} else {
					connection.query('DELETE FROM employee_locations where employee_id = ' + req.body.id + ' and location_id= ' + index, function(err, result){
						if (err)
							errors.push(err);
					})
				}
			}

			for (index in req.body.categories){
				if (req.body.categories[index]){	
					connection.query('INSERT INTO categorizations SET ?', {employee_id: req.body.id, category_id: index}, function(err, result){
						if (err)
							errors.push(err);
					})
				} else {
					connection.query('DELETE FROM categorizations where employee_id = ' + req.body.id + ' and category_id= ' + index, function(err, result){
						if (err)
							errors.push(err);
					})
				}
			}

			if(errors.length > 0)
				res.json(errors);
			else 
				res.json('success!');

		},

		deleteEmployee: function(req, res) {

			connection.query("delete from user_availability where employee_id = ?", req.params.id, function(err,rows){

				connection.query("delete from categorizations where employee_id = ?", req.params.id, function(err, rows){

					connection.query("delete from employee_locations where employee_id = ?", req.params.id, function(err, rows){	

						connection.query("delete from employees where id = ?", req.params.id, function (err, rows){
							if (err) 
								res.json(err)
							else 
								res.json(rows)
							
						});

					});	

				});

			});

		},

		editEmployee: function(req, res) {
			var post = {
				email: req.body[0].email, 
				password: req.body[0].password, 
				first_name: req.body[0].first_name,
				last_name: req.body[0].last_name, 
				employee_address_id: req.body[0].employee_address_id, 
				phone_number: req.body[0].phone_number, 
				created_at: (new Date()).toISOString().substring(0, 19).replace('T', ' '), 
				updated_at: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
			}

			var query1 = connection.query('UPDATE employees SET ? where id=' + req.body[0].id, post, function(err, result){
				var post2 = {
					address1: req.body[0].address1,
					address2: req.body[0].address2,
					city: req.body[0].city,
					state: req.body[0].state,
					zip: req.body[0].zip,
				};

				var query2 = connection.query('UPDATE employee_addresses SET ? where id =' + req.body[0].id, post2, function(err, result) {
				res.json(result)			
				});
			});
		},
		
		login: function(req,res){
			var query = "SELECT * FROM employees where email = '"+req.body.email+"'AND password = '"+req.body.password+"';"
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else {

					if(rows.length == 0){
						res.json({errors: 'Invalid email or password'});
					} else {

						var user = {
							email: rows[0].email,
							first_name: rows[0].first_name,
							last_name: rows[0].last_name,
							user_level: rows[0].user_level
						}

						req.session.user = user;
						res.json(user);

					}
				}
			})
		},

		retrieveUser: function(req,res){
			if(req.session.user){
				res.json(req.session.user)
			} else {
				res.json(null)
			}
		}
	}

})();