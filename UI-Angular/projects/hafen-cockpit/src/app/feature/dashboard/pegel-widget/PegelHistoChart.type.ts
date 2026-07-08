import { ChartData } from 'chart.js';
import { PegelHistoItemDto } from './PegelData.dto';

// Custom type to use in as chart data

export type LabeledPegelHistoItem = PegelHistoItemDto & {
	label: string;
};

export type PegelHistoChartData = ChartData<'line', LabeledPegelHistoItem[]>;
