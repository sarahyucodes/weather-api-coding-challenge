
# Weather API | Front-End Coding Challenge

I created this project with [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

It uses data from the [National Weather Service API](https://www.weather.gov/documentation/services-web-api) from the following endpoint:
```
https://api.weather.gov/radar/stations
```
I also used [neo-geo-tz](https://github.com/evansiroky/node-geo-tz) to get time zone using coordinates and [haversine](https://github.com/njj/haversine) to calculate distance between two sets of coordinates.

## Installation

1. Install dependencies

	```
	npm install
	```
	
2. Initialize time zones data

	```
	npm run init-timezones-data
	```
	
3. Start the development server

	```
	npm run start
	```