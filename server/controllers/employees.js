module.exports = (function() {
	return {
		allEmployees: function(req, res) {
			var query = "SELECT * FROM employees";
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else {
					console.log(rows)
					res.json(rows)
				}
			})
		},

		getOneEmployee: function(req, res) {
			var query = "SELECT * FROM employees WHERE id = ?";
			connection.query(query, req.params.id, function (err, rows){
				if (err) 
					res.json(err)
				else {
					res.json(rows)
				}
			})
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
				console.log(result.insertId);

				var post2 = {
				email: req.body.email, 
				password: req.body.password, 
				first_name: req.body.first_name,
				last_name: req.body.last_name, 
				birthday: req.body.birthday, 
				phone_number: req.body.phone_number,
				employee_address_id: result.insertId, 
				created_at: (new Date()).toISOString().substring(0, 19).replace('T', ' '), 
				updated_at: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
			};
			var query2 = connection.query('INSERT INTO employees SET ?', post2, function(err, result) {
			console.log(result);

			console.log(query1.sql + query2.sql); 

			return res.json(result.insertId);
			});
			
			
			});
			
		},

		deleteEmployee: function(req, res) {
			var query = "DELETE FROM employees WHERE id = ?";
			connection.query(query, req.params.id, function (err, rows){
				if (err) 
					res.json(err)
				else {
					res.json(rows)
				}
			})
		},

		login: function(req,res){
			var query = "SELECT email, password, first_name, last_name FROM employees where email = '"+req.body.email+"'AND password = '"+req.body.password+"';"
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else
					req.session.user = rows;
					res.json(rows)
			})
		},

		retrieveUser: function(req,res){
			if(req.session.user){
				res.json(req.session.user)
			} else {
				res.json('havent logged in')
			}
		}
	}

})();