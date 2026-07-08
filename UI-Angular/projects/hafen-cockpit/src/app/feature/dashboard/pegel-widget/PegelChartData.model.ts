import { ChartData } from 'chart.js';
import { PegelMeasurementDto } from './PegelData.dto';

// Custom type to use in as chart data
export type PegelChartData = ChartData<'line', PegelMeasurementDto[]>;
