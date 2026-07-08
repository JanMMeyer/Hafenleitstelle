import { WeatherAlertsDto } from './WeatherAlert.dto';

export const mockAlert: WeatherAlertsDto = {
	alerts: [
		{
			id: 279977,
			alert_id: '2.49.0.0.276.0.DWD.PVW.1691344680000.2cf9fad6-dc83-44ba-9e88-f2827439da59',
			status: 'actual',
			effective: '2023-08-06T17:58:00+00:00',
			onset: '2023-08-07T08:00:00+00:00',
			expires: '2023-08-07T19:00:00+00:00',
			category: 'met',
			response_type: 'prepare',
			urgency: 'immediate',
			severity: 'minor',
			certainty: 'observed',
			event_code: 51,
			event_en: 'wind gusts',
			event_de: 'WINDBÖEN',
			headline_en: 'Official WARNING of WIND GUSTS',
			headline_de: 'FAKE: Amtliche WARNUNG vor WINDBÖEN',
			description_en:
				'There is a risk of wind gusts (level 1 of 4).\nMax. gusts: 50-60 km/h; Wind direction: west; Increased gusts: near showers and in exposed locations < 70 km/h',
			description_de:
				'Es treten Windböen mit Geschwindigkeiten zwischen 50 km/h (14 m/s, 28 kn, Bft 7) und 60 km/h (17 m/s, 33 kn, Bft 7) aus westlicher Richtung auf. In Schauernähe sowie in exponierten Lagen muss mit Sturmböen bis 70 km/h (20 m/s, 38 kn, Bft 8) gerechnet werden.',
			instruction_en:
				'NOTE: Be aware of the following possible dangers: The downpours can cause temporary traffic disruption.',
			instruction_de:
				'ACHTUNG! Hinweis auf mögliche Gefahren: Während des Platzregens sind kurzzeitig Verkehrsbehinderungen möglich.',
		},
	],
	location: {
		warn_cell_id: 803159016,
		name: 'Stadt Göttingen',
		name_short: 'Göttingen',
		district: 'Göttingen',
		state: 'Niedersachsen',
		state_short: 'NI',
	},
};
