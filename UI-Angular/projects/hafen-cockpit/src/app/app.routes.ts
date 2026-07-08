import { Routes } from '@angular/router';
import { Dashboard } from './feature/dashboard/dashboard';

export const routes: Routes = [
	{
		path: '**',
		redirectTo: 'dashboard',
	},
	{
		path: 'dashboard',
		component: Dashboard,
	},
];
