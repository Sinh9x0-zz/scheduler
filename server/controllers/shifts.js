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

			var getEmployees = function(matchQuery, rowIndex, callback){
				connection.query(matchQuery, function(err, employees){
					callback(employees, rowIndex);
				});
			}

			var query = "SELECT * FROM shifts ";
			query += "join locations on locations.id = shifts.location_id ";
			query += "join categories on categories.id = shifts.category_id";

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
		}
	}

})();