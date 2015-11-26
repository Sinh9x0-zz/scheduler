module.exports = (function() {
	return {
		getLocations: function(req, res){
			var query = "SELECT * FROM locations join location_addresses on location_address_id = location_addresses.id";
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else {
					res.json(rows)
				}
			})
		},

		addLocation: function(req, res){
			console.log('trying to add location');

			var post1 = {
				address1: req.body.address1, 
				address2: req.body.address2,
				city: req.body.city, 
				state: req.body.state,
				zip: req.body.zip,
				created_at: (new Date()).toISOString().substring(0, 19).replace('T', ' '), 
				updated_at: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
			} 
			var query1 = connection.query('INSERT INTO location_addresses SET ?', post1, function(err, result) {
					var post2 = {
						name: req.body.name,
						phone_number: req.body.phone_number,
						location_address_id: result.insertId, 
						created_at: (new Date()).toISOString().substring(0, 19).replace('T', ' '), 
						updated_at: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
					};
					var query2 = connection.query('INSERT INTO locations SET ?', post2, function(err, result) {
						return res.json(result.insertId);
					});
					console.log(query1.sql + query2.sql);
				});			
			}
		}
})();