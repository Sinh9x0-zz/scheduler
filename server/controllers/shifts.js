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
			var query = connection.query("select * from employees where id = ?", req.params.id, function(err, records){					
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
			var startTime = moment(req.body.start).format("HH:mm:ss");
			var endTime = moment(req.body.end).format("HH:mm:ss");

			var post = {
				day: req.body.day, 
				category_id: req.body.category,
				location_id: req.body.location, 
				start_time: startTime,
				end_time: endTime,
				start_date: req.body.startDate,
				end_date: req.body.endDate,
				created_at: (new Date()).toISOString().substring(0, 19).replace('T', ' '), 
				updated_at: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
			}

			var query = connection.query('INSERT INTO shifts SET ?', post, function(err, result) {
				console.log(err);
				return res.json(result.insertId);
			});			
		},

		getAll: function(req,res){
			var query = "SELECT * FROM shifts left join locations on locations.id = shifts.location_id";
			connection.query(query, function (err, rows){
				if(rows)
					res.json(rows);
				else
					res.json(err);
			})
		},

		getAllEmployees: function(req,res){
			var condition1 = "user_availability."+req.body.day+" = 1";
			var condition2 = "employee_locations.location_id = "+req.body.location_id
			query = "SELECT employees.id, employees.first_name, employees.last_name, user_availability.mon, user_availability.tue , user_availability.wed, user_availability.thu, user_availability.fri, user_availability.sat, user_availability.sun, locations.name FROM employees left join user_availability on employees.id = user_availability.employee_id left join employee_locations on employees.id = employee_locations.employee_id left join locations on employee_locations.location_id = locations.id where "+ condition1 +" and " +condition2
			connection.query(query, function (err, workers){
				if(workers){
					res.json(workers);
				}else{
					res.json(err);
				}
			})	
		}
	}

})();