// AI generated

/** Bright Sky weather condition (snake_case in JSON). */

export type WeatherCondition =
	'dry' | 'fog' | 'rain' | 'sleet' | 'snow' | 'hail' | 'thunderstorm' | 'unknown';
/** Bright Sky weather icon (snake_case in JSON). */
export type WeatherIcon =
	| 'clear-day'
	| 'clear-night'
	| 'partly-cloudy-day'
	| 'partly-cloudy-night'
	| 'cloudy'
	| 'fog'
	| 'wind'
	| 'rain'
	| 'sleet'
	| 'snow'
	| 'hail'
	| 'thunderstorm'
	| 'unknown';
export type ObservationType = 'historical' | 'current' | 'synop' | 'forecast';

/**
 * Current weather compiled from recent SYNOP observations (past ~1.5 hours).
 *
 * @see https://brightsky.dev/docs/#/operations/getCurrentWeather
 *
 * @property {string} timestamp - ISO 8601-formatted timestamp of this weather record.
 * @property {number} source_id - Bright Sky source ID for this record.
 * @property {number | null} cloud_cover - Total cloud cover at timestamp (%).
 * @property {WeatherCondition | null} condition - Current weather conditions. Unlike the numerical parameters, this field is not taken as-is from the raw data (because it does not exist), but is calculated from different fields in the raw data as a best effort. Not all values are available for all source types.
 * @property {number | null} dew_point - Dew point at timestamp, 2 m above ground (°C).
 * @property {WeatherIcon | null} icon - Icon alias suitable for the current weather conditions. Unlike the numerical parameters, this field is not taken as-is from the raw data (because it does not exist), but is calculated from different fields in the raw data as a best effort. Not all values are available for all source types.
 * @property {number | null} pressure_msl - Atmospheric pressure at timestamp, reduced to mean sea level (hPa).
 * @property {number | null} relative_humidity - Relative humidity at timestamp (%).
 * @property {number | null} temperature - Air temperature at timestamp, 2 m above the ground (°C).
 * @property {number | null} visibility - Visibility at timestamp (m).
 * @property {Record<string, number>} fallback_source_ids - Object mapping meteorological parameters to the source IDs of alternative sources that were used to fill up missing values in the main source.
 * @property {number | null} precipitation_10 - Total precipitation during previous 10 minutes (mm).
 * @property {number | null} precipitation_30 - Total precipitation during previous 30 minutes (mm).
 * @property {number | null} precipitation_60 - Total precipitation during previous 60 minutes (mm).
 * @property {number | null} solar_10 - Solar irradiation during previous 10 minutes (kWh/m²).
 * @property {number | null} solar_30 - Solar irradiation during previous 30 minutes (kWh/m²).
 * @property {number | null} solar_60 - Solar irradiation during previous 60 minutes (kWh/m²).
 * @property {number | null} sunshine_30 - Sunshine duration during previous 30 minutes (min).
 * @property {number | null} sunshine_60 - Sunshine duration during previous 60 minutes (min).
 * @property {number | null} wind_direction_10 - Mean wind direction during previous 10 minutes, 10 m above the ground (°).
 * @property {number | null} wind_direction_30 - Mean wind direction during previous 30 minutes, 10 m above the ground (°).
 * @property {number | null} wind_direction_60 - Mean wind direction during previous 60 minutes, 10 m above the ground (°).
 * @property {number | null} wind_speed_10 - Mean wind speed during previous 10 minutes, 10 m above the ground (km/h).
 * @property {number | null} wind_speed_30 - Mean wind speed during previous 30 minutes, 10 m above the ground (km/h).
 * @property {number | null} wind_speed_60 - Mean wind speed during previous 60 minutes, 10 m above the ground (km/h).
 * @property {number | null} wind_gust_direction_10 - Direction of maximum wind gust during previous 10 minutes, 10 m above the ground (°).
 * @property {number | null} wind_gust_direction_30 - Direction of maximum wind gust during previous 30 minutes, 10 m above the ground (°).
 * @property {number | null} wind_gust_direction_60 - Direction of maximum wind gust during previous 60 minutes, 10 m above the ground (°).
 * @property {number | null} wind_gust_speed_10 - Speed of maximum wind gust during previous 10 minutes, 10 m above the ground (km/h).
 * @property {number | null} wind_gust_speed_30 - Speed of maximum wind gust during previous 30 minutes, 10 m above the ground (km/h).
 * @property {number | null} wind_gust_speed_60 - Speed of maximum wind gust during previous 60 minutes, 10 m above the ground (km/h).
 */

export type CurrentWeatherDto = {
	timestamp: string;
	source_id: number;
	cloud_cover: number | null;
	condition: WeatherCondition | null;
	dew_point: number | null;
	icon: WeatherIcon | null;
	pressure_msl: number | null;
	relative_humidity: number | null;
	temperature: number | null;
	visibility: number | null;
	fallback_source_ids: Record<string, number>;
	precipitation_10: number | null;
	precipitation_30: number | null;
	precipitation_60: number | null;
	solar_10: number | null;
	solar_30: number | null;
	solar_60: number | null;
	sunshine_30: number | null;
	sunshine_60: number | null;
	wind_direction_10: number | null;
	wind_direction_30: number | null;
	wind_direction_60: number | null;
	wind_speed_10: number | null;
	wind_speed_30: number | null;
	wind_speed_60: number | null;
	wind_gust_direction_10: number | null;
	wind_gust_direction_30: number | null;
	wind_gust_direction_60: number | null;
	wind_gust_speed_10: number | null;
	wind_gust_speed_30: number | null;
	wind_gust_speed_60: number | null;
};

export function isCurrentWeatherDto(data: unknown): data is CurrentWeatherDto {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const record = data as Record<string, unknown>;
	return (
		typeof record['timestamp'] === 'string' &&
		typeof record['source_id'] === 'number' &&
		(typeof record['cloud_cover'] === 'number' || record['cloud_cover'] === null) &&
		(typeof record['condition'] === 'string' || record['condition'] === null) &&
		(typeof record['dew_point'] === 'number' || record['dew_point'] === null) &&
		(typeof record['icon'] === 'string' || record['icon'] === null) &&
		(typeof record['pressure_msl'] === 'number' || record['pressure_msl'] === null) &&
		(typeof record['relative_humidity'] === 'number' || record['relative_humidity'] === null) &&
		(typeof record['temperature'] === 'number' || record['temperature'] === null) &&
		(typeof record['visibility'] === 'number' || record['visibility'] === null) &&
		typeof record['fallback_source_ids'] === 'object' &&
		record['fallback_source_ids'] !== null &&
		(typeof record['precipitation_10'] === 'number' || record['precipitation_10'] === null) &&
		(typeof record['precipitation_30'] === 'number' || record['precipitation_30'] === null) &&
		(typeof record['precipitation_60'] === 'number' || record['precipitation_60'] === null) &&
		(typeof record['solar_10'] === 'number' || record['solar_10'] === null) &&
		(typeof record['solar_30'] === 'number' || record['solar_30'] === null) &&
		(typeof record['solar_60'] === 'number' || record['solar_60'] === null) &&
		(typeof record['sunshine_30'] === 'number' || record['sunshine_30'] === null) &&
		(typeof record['sunshine_60'] === 'number' || record['sunshine_60'] === null) &&
		(typeof record['wind_direction_10'] === 'number' || record['wind_direction_10'] === null) &&
		(typeof record['wind_direction_30'] === 'number' || record['wind_direction_30'] === null) &&
		(typeof record['wind_direction_60'] === 'number' || record['wind_direction_60'] === null) &&
		(typeof record['wind_speed_10'] === 'number' || record['wind_speed_10'] === null) &&
		(typeof record['wind_speed_30'] === 'number' || record['wind_speed_30'] === null) &&
		(typeof record['wind_speed_60'] === 'number' || record['wind_speed_60'] === null) &&
		(typeof record['wind_gust_direction_10'] === 'number' || record['wind_gust_direction_10'] === null) &&
		(typeof record['wind_gust_direction_30'] === 'number' || record['wind_gust_direction_30'] === null) &&
		(typeof record['wind_gust_direction_60'] === 'number' || record['wind_gust_direction_60'] === null) &&
		(typeof record['wind_gust_speed_10'] === 'number' || record['wind_gust_speed_10'] === null) &&
		(typeof record['wind_gust_speed_30'] === 'number' || record['wind_gust_speed_30'] === null) &&
		(typeof record['wind_gust_speed_60'] === 'number' || record['wind_gust_speed_60'] === null)
	);
}

export type CurrentWeatherSourceDto = {
	id: number;
	dwd_station_id: string | null;
	wmo_station_id: string;
	station_name: string;
	observation_type: ObservationType;
	first_record: string;
	last_record: string;
	lat: number;
	lon: number;
	height: number;
	distance: number | null;
};

export function isCurrentWeatherSourceDto(data: unknown): data is CurrentWeatherSourceDto {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const record = data as Record<string, unknown>;
	return (
		typeof record['id'] === 'number' &&
		(typeof record['dwd_station_id'] === 'string' || record['dwd_station_id'] === null) &&
		typeof record['wmo_station_id'] === 'string' &&
		typeof record['station_name'] === 'string' &&
		typeof record['observation_type'] === 'string' &&
		typeof record['first_record'] === 'string' &&
		typeof record['last_record'] === 'string' &&
		typeof record['lat'] === 'number' &&
		typeof record['lon'] === 'number' &&
		typeof record['height'] === 'number' &&
		(typeof record['distance'] === 'number' || record['distance'] === null)
	);
}

/** Root response from GET /current_weather */
export type WeatherDataDto = {
	weather: CurrentWeatherDto;
	sources: CurrentWeatherSourceDto[];
};

export function isWeatherDataDto(data: unknown): data is WeatherDataDto {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const record = data as Record<string, unknown>;
	return (
		isCurrentWeatherDto(record['weather']) &&
		Array.isArray(record['sources']) &&
		record['sources'].every(isCurrentWeatherSourceDto)
	);
}
