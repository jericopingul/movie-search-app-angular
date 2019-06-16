import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MovieComponent, MoviePlotDialog } from './movie/movie.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { MovieService } from './services/movie.service';

import { moviesReducer } from './redux/movies.reducer';
import { ControlsComponent } from './controls/controls.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultsComponent,
    MovieComponent,
    MoviePlotDialog,
    SearchComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    StoreModule.forRoot({
      app: moviesReducer
    })
  ],
  providers: [MovieService],
  bootstrap: [AppComponent],
  entryComponents: [ResultsComponent, MoviePlotDialog]
})
export class AppModule {}
