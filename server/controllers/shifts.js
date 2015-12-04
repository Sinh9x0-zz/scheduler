var moment = require('moment');
moment().format();

module.exports = (function() {
	return {
		availableShifts: function(req, res) {
			var query = "SELECT * FROM shifts where user.id = null";
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else
					res.json(rows)
			})
		},

		employeeShift: function(req, res){
			var query = "SELECT shifts.location_id, shifts.id, categories.category, locations.name, shifts.day, shifts.start_date, shifts.end_date, shifts.start_time, shifts.end_time FROM shifts ";
			query += "join locations on locations.id = shifts.location_id ";
			query += "join categories on categories.id = shifts.category_id ";
			query +="where shifts.employee_id ="+req.params.id
			console.log(query);
			var query = connection.query(query, function(err, records){					
				if (err){
					res.json(err);
				} else {
					res.json(records);
				}
			});
		},

		getCategories: function(req, res){
			var query = connection.query("select * from categories", function(err, records){					
				if (err){
					res.json(err);
				} else {
					res.json(records);
				}
			});
		},

		addShift: function(req, res) {
			var now = new Date();

			//validations
			req.assert('day', 'Day is required').notEmpty();
			req.assert('category', 'Category is required').notEmpty();
			req.assert('location', 'Location is required').notEmpty();
			req.assert('start', 'Start Time is required').notEmpty();
			req.assert('end', 'End Time required').notEmpty();
			req.assert('startDate', 'Start Date is required').notEmpty();
			req.assert('endDate', 'End Date required').notEmpty();

			var post = {
				day: req.body.day, 
				category_id: req.body.category,
				location_id: req.body.location, 
				start_time: moment(req.body.start).format("HH:mm:ss"),
				end_time: moment(req.body.end).format("HH:mm:ss"),
				start_date: moment(req.body.startDate).format("YYYY-MM-DD"),
				end_date: moment(req.body.endDate).format("YYYY-MM-DD"),
				created_at: (new Date()).toISOString().substring(0, 19).replace('T', ' '), 
				updated_at: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
			}

			var errors = req.validationErrors(true);

			if (new Date(req.body.startDate) < now){
				if(!errors){
					errors = {}
				}

				errors.startDate = {
					param: 'startDate',
					msg: 'Start date needs to be in the future',
					value: undefined
				}
			}

			if(req.body.endDate < req.body.startDate){
				if(!errors){
					errors = {}
				}

				errors.endDate = {
					param: 'endDate',
					msg: 'End date must be after start date',
					value: undefined
				}
			}

			if(req.body.end < req.body.start ){
				if(!errors){
					errors = {}
				}

				errors.time = {
					param: 'end',
					msg: 'Start and end times do not make sense',
					value: undefined
				}
			}

			if(errors){

				res.json(errors);

			} else {

				var query = connection.query('INSERT INTO shifts SET ?', post, function(err, result) {

					if (err){
						res.json(err);
					}
					else {
						res.json(result.insertId);
					}
				});	

			}						
						
		},

		getAll: function(req,res){

			var getEmployees = function(matchQuery, rowIndex, callback){
				connection.query(matchQuery, function(err, employees){
					callback(employees, rowIndex);
				});
			}

			var query = "SELECT shifts.location_id, shifts.id, categories.category, locations.name, shifts.day, shifts.start_date, shifts.end_date, shifts.start_time, shifts.end_time FROM shifts ";
			query += "join locations on locations.id = shifts.location_id ";
			query += "join categories on categories.id = shifts.category_id ";
			query += "where shifts.employee_id IS NULL" 

			connection.query(query, function (err, rows){
				if (err) {
					console.log(err);
					res.json(err);
				} else {
					var matchedEmployees = "";
					var rowIndex = 0;
					for (index in rows) {
						matchedEmployees += "select * from employees ";
						matchedEmployees += "join categorizations ";
						matchedEmployees += "on categorizations.employee_id = employees.id ";
						matchedEmployees += "where categorizations.category_id = " + rows[index].category_id;

						rowIndex = index;

						getEmployees(matchedEmployees, rowIndex, function(employees, oIndex){
							rows[oIndex].matchedEmployee = employees;
							if(rows.length - 1 == oIndex){
								res.json(rows);
							}
						});

						matchedEmployees = "";
					}
				}
			})
		},

		getAllEmployees: function(req,res){
			var condition1 = "user_availability."+req.body.day+" = 1";
			var condition2 = "employee_locations.location_id = "+req.body.location_id
			query = "SELECT employees.id, employees.first_name, employees.last_name, user_availability.mon, user_availability.tue , user_availability.wed, user_availability.thu, user_availability.fri, user_availability.sat, user_availability.sun, locations.name FROM employees left join user_availability on employees.id = user_availability.employee_id left join employee_locations on employees.id = employee_locations.employee_id left join locations on employee_locations.location_id = locations.id where "+ condition1 +" and " +condition2;
			connection.query(query, function (err, workers){
				if(workers){
					res.json(workers);
				}else{
					res.json(err);
				}
			})	
		},

		assign: function(req,res){

			query = "UPDATE shifts SET employee_id = '" + req.body.selected.id + "' WHERE id = '" +req.body.id+ "';";
			console.log(query);	
			connection.query(query, function(err, response){
				if(err){
					console.log(err);
				}else{
					console.log(response);
				}
			})
		}
	}

})();