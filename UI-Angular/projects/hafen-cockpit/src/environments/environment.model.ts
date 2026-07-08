export interface Environment {
	readonly production: boolean;
	readonly errorLoggingUrl: string;
	readonly pegelStationUuid: string;
	readonly locationGps: Readonly<{ lat: number; lon: number }>;
}
