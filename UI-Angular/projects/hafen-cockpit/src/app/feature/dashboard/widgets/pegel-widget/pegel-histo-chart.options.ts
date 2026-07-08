import { ChartOptions } from 'chart.js';

/** Chart.js options for the pegel history line chart (P1D water level).
 * Annotations are AI generated!
 */

export const pegelHistoGraphOptions: ChartOptions<'line'> = {
	// Width-to-height ratio when maintainAspectRatio is true (default).
	// aspectRatio: 2,
	responsive: true,
	maintainAspectRatio: false,

	// Map PegelHistoItemDto fields to x/y without reshaping the dataset.
	parsing: {
		xAxisKey: 'timestamp',
		yAxisKey: 'value',
	},

	scales: {
		x: {
			// ISO 8601 timestamps from the API; requires chartjs-adapter-date-fns.
			type: 'time',
			time: {
				unit: 'hour',
				displayFormats: { hour: 'HH:mm' },
			},
		},
	},

	elements: {
		point: {
			// Line only — no visible markers on each measurement.
			radius: 0,
			// Show a marker on hover for tooltip feedback.
			hoverRadius: 4,
			// Invisible hit area so tooltips still trigger without visible dots.
			hitRadius: 10,
		},
		line: {
			// Bezier smoothing: 0 = straight segments, 1 = maximum curve.
			tension: 0.6,
			// Avoid overshooting between points (important for level time series).
			cubicInterpolationMode: 'monotone',
		},
	},

	plugins: {
		legend: {
			// Single unnamed dataset — legend adds no value.
			display: false,
		},
	},
};
