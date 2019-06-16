import { Component, OnInit, Input, Inject } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  constructor(private movieService: MovieService, private dialog: MatDialog) {}

  ngOnInit() {}

  onClick(item: Movie) {
    this.movieService.getById(item.imdbID).subscribe(movieDetails => {
      this.dialog.open(MoviePlotDialog, {
        data: movieDetails
      });
    });
  }
}

@Component({
  selector: 'movie-dialog-content',
  templateUrl: 'movie-dialog-template.html'
})
export class MoviePlotDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
