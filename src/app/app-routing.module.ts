import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/shared/sevices/auth.guard';
import { AuthComponent } from './modules/auth/auth.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'content',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'content/films/list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
