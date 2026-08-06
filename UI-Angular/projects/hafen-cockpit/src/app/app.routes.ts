import { Routes } from '@angular/router';
import { Dashboard } from './feature/dashboard/dashboard';

export const routes: Routes = [
	{
		path: 'dashboard',
		component: Dashboard,
	},
	{
		path: '**',
		redirectTo: 'dashboard',
	},
];
