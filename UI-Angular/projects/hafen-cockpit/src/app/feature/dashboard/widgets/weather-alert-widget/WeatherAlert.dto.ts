// AI generated

export type AlertStatus = 'actual' | 'test';
export type AlertCategory = 'met' | 'health';
export type AlertResponseType = 'prepare' | 'allclear' | 'none' | 'monitor';
export type AlertUrgency = 'immediate' | 'future';
export type AlertSeverity = 'minor' | 'moderate' | 'severe' | 'extreme';
export type AlertCertainty = 'observed' | 'likely';

// Clear boundary validation: robust DTO runtime guards for external API data

/**
 * DWD weather alert (CAP message).
 *
 * @see https://brightsky.dev/docs/#/operations/getAlerts
 *
 * @property {number} id - Bright Sky-internal ID for this alert.
 * @property {string} alert_id - Unique CAP message identifier.
 * @property {AlertStatus} status - Alert status.
 * @property {string} effective - Alert issue time (ISO 8601).
 * @property {string} onset - Expected event begin time (ISO 8601).
 * @property {string | null} expires - Expected event end time (ISO 8601).
 * @property {AlertCategory | null} category - Meteorological (`met`) or public health (`health`) message.
 * @property {AlertResponseType | null} response_type - Recommended action for the target audience.
 * @property {AlertUrgency | null} urgency - Alert time frame.
 * @property {AlertSeverity | null} severity - Alert severity.
 * @property {AlertCertainty | null} certainty - Alert certainty.
 * @property {number | null} event_code - DWD event code.
 * @property {string | null} event_en - Label for DWD event code (English).
 * @property {string | null} event_de - Label for DWD event code (German).
 * @property {string} headline_en - Alert headline (English).
 * @property {string} headline_de - Alert headline (German).
 * @property {string} description_en - Alert description (English).
 * @property {string} description_de - Alert description (German).
 * @property {string | null} instruction_en - Additional instructions and safety advice (English).
 * @property {string | null} instruction_de - Additional instructions and safety advice (German).
 */
export type WeatherAlertDto = {
	id: number;
	alert_id: string;
	status: AlertStatus;
	effective: string;
	onset: string;
	expires: string | null;
	category: AlertCategory | null;
	response_type: AlertResponseType | null;
	urgency: AlertUrgency | null;
	severity: AlertSeverity | null;
	certainty: AlertCertainty | null;
	event_code: number | null;
	event_en: string | null;
	event_de: string | null;
	headline_en: string;
	headline_de: string;
	description_en: string;
	description_de: string;
	instruction_en: string | null;
	instruction_de: string | null;
};

export function isWeatherAlertDto(data: unknown): data is WeatherAlertDto {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const record = data as Record<string, unknown>;
	return (
		typeof record['id'] === 'number' &&
		typeof record['alert_id'] === 'string' &&
		typeof record['status'] === 'string' &&
		typeof record['effective'] === 'string' &&
		typeof record['onset'] === 'string' &&
		(typeof record['expires'] === 'string' || record['expires'] === null) &&
		(typeof record['category'] === 'string' || record['category'] === null) &&
		(typeof record['response_type'] === 'string' || record['response_type'] === null) &&
		(typeof record['urgency'] === 'string' || record['urgency'] === null) &&
		(typeof record['severity'] === 'string' || record['severity'] === null) &&
		(typeof record['certainty'] === 'string' || record['certainty'] === null) &&
		(typeof record['event_code'] === 'number' || record['event_code'] === null) &&
		(typeof record['event_en'] === 'string' || record['event_en'] === null) &&
		(typeof record['event_de'] === 'string' || record['event_de'] === null) &&
		typeof record['headline_en'] === 'string' &&
		typeof record['headline_de'] === 'string' &&
		typeof record['description_en'] === 'string' &&
		typeof record['description_de'] === 'string' &&
		(typeof record['instruction_en'] === 'string' || record['instruction_en'] === null) &&
		(typeof record['instruction_de'] === 'string' || record['instruction_de'] === null)
	);
}

/**
 * Municipality warn cell for the requested location.
 *
 * @property {number} warn_cell_id - Municipality warn cell ID.
 * @property {string} name - Municipality name.
 * @property {string} name_short - Shortened municipality name.
 * @property {string} district - District name.
 * @property {string} state - Federal state name.
 * @property {string} state_short - Shortened federal state name.
 */
export type WeatherAlertLocationDto = {
	warn_cell_id: number;
	name: string;
	name_short: string;
	district: string;
	state: string;
	state_short: string;
};

export function isWeatherAlertLocationDto(data: unknown): data is WeatherAlertLocationDto {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const record = data as Record<string, unknown>;
	return (
		typeof record['warn_cell_id'] === 'number' &&
		typeof record['name'] === 'string' &&
		typeof record['name_short'] === 'string' &&
		typeof record['district'] === 'string' &&
		typeof record['state'] === 'string' &&
		typeof record['state_short'] === 'string'
	);
}

/** Root response from GET /alerts */
export type WeatherAlertsDto = {
	alerts: WeatherAlertDto[];
	location: WeatherAlertLocationDto | null;
};

export function isWeatherAlertsDto(data: unknown): data is WeatherAlertsDto {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const record = data as Record<string, unknown>;
	return (
		Array.isArray(record['alerts']) &&
		record['alerts'].every(isWeatherAlertDto) &&
		(record['location'] === null || isWeatherAlertLocationDto(record['location']))
	);
}
