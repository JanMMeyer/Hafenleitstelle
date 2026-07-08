// Typeguards are AI generated and checked

export type PegelGaugeZeroDto = {
	unit: string;
	value: number;
	validFrom: string;
};

export function isPegelGaugeZeroDto(data: unknown): data is PegelGaugeZeroDto {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const record = data as Record<string, unknown>;
	return (
		typeof record['unit'] === 'string' &&
		typeof record['value'] === 'number' &&
		typeof record['validFrom'] === 'string'
	);
}

export type RelativeState = 'low' | 'normal' | 'high' | 'unknown' | 'commented' | 'out-dated';

/**
	Current water-level measurement.

	@property {string} timestamp: Zeitpunkt kodiert im ISO 8601 Format.
	@property {number} value: Aktueller Wasserstand in der Einheit der Ressource (parent dto).
	@property {RelativeState} stateMnwMhw: Relative State des aktuellen Wasserstands im Verhältnis zu den mittleren niedrigsten Werten (MNW) und den mittleren höchsten Werten (MHW).
	@property {RelativeState} stateNswHsw: Relative State des aktuellen Wasserstands im Verhältnis zum höchsten Schifffahrtswasserstand (HSW).

	@property {RelativeState} stateMnwMhw und @property {RelativeState} stateNswHsw setzen den aktuellen Wasserstand
	entweder mit den mittleren niedrigsten Werten (MNW)	und den mittleren höchsten Werten (MHW) in Beziehung (stateMnwMhw)
	oder mit dem höchsten Schifffahrtswasserstand (stateNswHsw). Beide können folgende Werte annehmen:

		low: Aktueller Wasserstand unterhalb/gleich des MNW (nur stateMnwMhw)
		normal: Aktueller Wasserstand zwischen MNW und MHW bzw. zwischen 0 und HSW
		high: Aktueller Wasserstand oberhalb/gleich MHW bzw. HSW
		unknown: Unbekannt, da MHW/MNW bzw. HSW für Zeitreihe nicht vorhanden
		commented: Fehlfunktion oder Störung. Siehe Subressource comment in Ressource Timeseries
		out-dated: Aktueller Wasserstand veraltet (älter als 25 Stunden)
   */
export type PegelCurrentMeasurementDto = {
	timestamp: string;
	value: number;
	stateMnwMhw: RelativeState;
	stateNswHsw: RelativeState;
};

export function isPegelCurrentMeasurementDto(data: unknown): data is PegelCurrentMeasurementDto {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const record = data as Record<string, unknown>;
	return (
		typeof record['timestamp'] === 'string' &&
		typeof record['value'] === 'number' &&
		typeof record['stateMnwMhw'] === 'string' &&
		typeof record['stateNswHsw'] === 'string'
	);
}

export type PegelDataDto = {
	shortname: string;
	longname: string;
	unit: string;
	equidistance: number;
	currentMeasurement: PegelCurrentMeasurementDto;
	gaugeZero: PegelGaugeZeroDto;
};

// AI generated and checked
export function isPegelDataDto(data: unknown): data is PegelDataDto {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const record = data as Record<string, unknown>;
	return (
		typeof record['shortname'] === 'string' &&
		typeof record['longname'] === 'string' &&
		typeof record['unit'] === 'string' &&
		typeof record['equidistance'] === 'number' &&
		isPegelCurrentMeasurementDto(record['currentMeasurement']) &&
		isPegelGaugeZeroDto(record['gaugeZero'])
	);
}

export type PegelMeasurementDto = {
	timestamp: string;
	value: number;
};

export function isPegelMeasurementDto(data: unknown): data is PegelMeasurementDto {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const record = data as Record<string, unknown>;
	return typeof record['timestamp'] === 'string' && typeof record['value'] === 'number';
}

export type PegelMeasurementDataDto = PegelMeasurementDto[];

export function isPegelMeasurementDataDto(data: unknown): data is PegelMeasurementDataDto {
	return Array.isArray(data) && data.every(isPegelMeasurementDto);
}
