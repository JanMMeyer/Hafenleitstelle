// AI generated

export type AlertStatus = 'actual' | 'test';
export type AlertCategory = 'met' | 'health';
export type AlertResponseType = 'prepare' | 'allclear' | 'none' | 'monitor';
export type AlertUrgency = 'immediate' | 'future';
export type AlertSeverity = 'minor' | 'moderate' | 'severe' | 'extreme';
export type AlertCertainty = 'observed' | 'likely';

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

/** Root response from GET /alerts */
export type WeatherAlertsDto = {
	alerts: WeatherAlertDto[];
	location: WeatherAlertLocationDto | null;
};
