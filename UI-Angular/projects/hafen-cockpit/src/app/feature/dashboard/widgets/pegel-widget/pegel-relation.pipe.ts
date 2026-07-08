import { Pipe, PipeTransform } from '@angular/core';
import { RelativeState } from './PegelData.dto';

@Pipe({
	name: 'pegelRelation',
	standalone: true,
})
export class PegelRelationPipe implements PipeTransform {
	transform(value: RelativeState): string {
		switch (value) {
			case 'unknown':
				return '---';
			case 'commented':
				return '---';
			case 'out-dated':
				return '---';
			default:
				return value;
		}
	}
}
