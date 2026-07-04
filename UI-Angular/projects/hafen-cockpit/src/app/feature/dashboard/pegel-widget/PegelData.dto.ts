// Typeguards are AI generated and checked

export type PegelGaugeZeroDto = {
	unit: string;
	value: number;
	validFrom: string;
  }

export function isPegelGaugeZeroDto(data: unknown): data is PegelGaugeZeroDto {
	return typeof data === 'object' && data !== null && 'unit' in data && 'value' in data && 'validFrom' in data;
  }

  export type PegelCurrentMeasurementDto = {
	timestamp: string;
	value: number;
	stateMnwMhw: string;
	stateNswHsw: string;
  }

  export function isPegelCurrentMeasurementDto(data: unknown): data is PegelCurrentMeasurementDto {
	return typeof data === 'object' && data !== null && 'timestamp' in data && 'value' in data && 'stateMnwMhw' in data && 'stateNswHsw' in data;
  }



  export type PegelDataDto = {
	shortname: string;
	longname: string;
	unit: string;
	equidistance: number;
	currentMeasurement: PegelCurrentMeasurementDto;
	gaugeZero: PegelGaugeZeroDto;
  }

  // AI generated and checked
  export function isPegelDataDto(data: unknown): data is PegelDataDto {
	return typeof data === 'object' && data !== null && 'shortname' in data && 'longname' in data && 'unit' in data && 'equidistance' in data && 'currentMeasurement' in data && 'gaugeZero' in data;
  }