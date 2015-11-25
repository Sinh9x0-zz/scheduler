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
		}
	}
})();