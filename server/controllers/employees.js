module.exports = (function() {
	return {
		allEmployees: function(req, res) {
			var query = "SELECT employees.id, email, first_name, last_name, phone_number ";
			query += "FROM employees JOIN employee_addresses ON employee_address_id = employee_addresses.id ";
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else {
					res.json(rows)
				}
			})
		},

		getOneEmployee: function(req, res) {
			var query = "SELECT employees.id, email, first_name, last_name, phone_number, address1, address2, city, zip, state ";
			query += "FROM employees JOIN employee_addresses ON employee_address_id = employee_addresses.id ";
			query += "WHERE employees.id = " + req.params.id;

			var c = connection.query(query, function(err, rows){
					if (err) {
						res.json(err)
					} else { 
						res.json(rows)
					}
			});
		},

		addEmployee: function(req, res) {
			req.assert('email', 'Invalid email given').notEmpty().isEmail();
			req.assert('password', 'Password must be between 6 and 20 characters').len(6, 20);
			req.assert('cpassword', 'Passwords do not match').equals(req.body.password);
			req.assert('first_name', 'Valid first name is required').notEmpty().isAlpha();
			req.assert('last_name', 'Valid last name is required').notEmpty().isAlpha();

			req.assert('address1', 'Employee address is required').notEmpty();
			req.assert('city', 'City is required').notEmpty();
			req.assert('state', 'State is required').notEmpty();
			req.assert('zip', 'Valid zip code required').isNumeric().len(5);

			req.sanitize('phone_number').blacklist('-');
			// req.sanitize('phone_number').toInt();
			req.assert('phone_number', 'Valid phone number required').len(10, 11);

			var errors = req.validationErrors(true);

			if(errors){

				res.json(errors)

			} else {

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

					if (err) {

						res.json(err);

					} else {			

						console.log(result);

						var query2 = connection.query('INSERT INTO employees SET ?', post2, function(err, result) {

							console.log(query2.sql);

							if (err) {
								res.json(err);
							} else {
								res.json(result.insertId);
							}

						});
					}
				});
			}
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

						connection.query("update shifts set ? where employee_id =" + req.params.id, {employee_id: null}, function(err, rows){	

							connection.query("delete from employees where id = ?", req.params.id, function (err, rows){
								if (err) 
									res.json(err)
								else 
									res.json(rows)
								
							});

						});

					});	

				});

			});

		},

		editEmployee: function(req, res) {

			req.assert('email', 'Invalid email given').notEmpty().isEmail();
			req.assert('first_name', 'Valid first name is required').notEmpty().isAlpha();
			req.assert('last_name', 'Valid last name is required').notEmpty().isAlpha();

			req.assert('address1', 'Employee address is required').notEmpty();
			req.assert('city', 'City is required').notEmpty();
			req.assert('state', 'State is required').notEmpty();
			req.assert('zip', 'Valid zip code required').isNumeric().len(5);

			req.sanitize('phone_number').blacklist('-');
			req.sanitize('phone_number').toInt();
			req.assert('phone_number', 'Valid phone number required').len(10, 11);

			var errors = req.validationErrors(true);

			if(errors){

				res.json(errors)

			} else {

				var post = {
					email: req.body.email, 
					first_name: req.body.first_name,
					last_name: req.body.last_name, 
					phone_number: req.body.phone_number, 
					updated_at: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
				}

				var query1 = connection.query('UPDATE employees SET ? where id=' + req.body.id, post, function(err, result){
					var post2 = {
						address1: req.body.address1,
						address2: req.body.address2,
						city: req.body.city,
						state: req.body.state,
						zip: req.body.zip,
					};

					var query2 = connection.query('UPDATE employee_addresses SET ? where id =' + req.body.id, post2, function(err, result) {
						res.json(1)			
					});
				});
			}
		},

		editPassword: function(req,res){
			req.assert('newpassword', 'Password must be between 6 and 20 characters').len(6, 20);
			var errors = req.validationErrors(true);
			if(errors){
				res.json(errors)
			} else {
				connection.query("UPDATE employees SET password ='"+ req.body.newpassword+ "' where id ='" + req.body.id + "' AND password ='" + req.body.oldpassword + "';", function(err,result){
					if (err) 
						res.json(err)
					else {
					res.json(result)
					}
				})
			 }
		},
		
		login: function(req,res){
			var query = "SELECT * FROM users where email = '" + req.body.email;
			query += "' AND password = '" + req.body.password + "'"; 

			connection.query(query, function (err, rows){
				if (err) {
					res.json(err)
				} else {

					if(rows.length == 0){
						res.json({errors: 'Invalid email or password'});
					} else {

						var user = {
							id: rows[0].id,
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