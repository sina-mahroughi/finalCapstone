let city = prompt("Plaese enter a city name:");
let cityDataShow = {};

// API fetch for city code 
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b849daacecmsh7df73573a1b3444p128929jsnfa7c4ebfbc36',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${city}`, options)
	.then(response => response.json())
	.then(response => {

		// API fetch for population and elevation
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'b849daacecmsh7df73573a1b3444p128929jsnfa7c4ebfbc36',
				'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
			}
		};

		const wikiDataId = response.wikiDataId;
		
		fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${wikiDataId}`, options)
			.then(response => response.json())
			.then(response => {
				const currentCity = response[0];
				cityDataShow.population = currentCity.population;
				cityDataShow.elevation = currentCity.elevationMeters;

				console.log(cityDataShow.population);
				console.log(cityDataShow.elevation);
		
				// API fetch for city temprature
				const options = {
					method: 'GET',
					headers: {
						'X-RapidAPI-Key': 'b849daacecmsh7df73573a1b3444p128929jsnfa7c4ebfbc36',
						'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
					}
				};
				
				fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${currentCity.longitude}&lat=${currentCity.latitude}`, options)
					.then(response => response.json())
					.then(response => {
						cityDataShow.temprature = response.app_temp;
						console.log(cityDataShow.temprature);
						console.log(cityDataShow);
					})
					.catch(err => console.error(err));
		
			})
			.catch(err => console.error(err));
	
	})
	.catch(err => console.error(err));



