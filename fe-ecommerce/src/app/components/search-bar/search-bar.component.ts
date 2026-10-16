import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit{

  searchControl: FormControl = new FormControl('');

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(250)
    ).subscribe(input => {
      const term = (input ?? '').trim();
      if (term.length > 0) {
        this.navigateToSearch(term);
      }
      else{
        this.router.navigateByUrl('/');
      }
    });
  }

  navigateToSearch(input : string){
    this.router.navigateByUrl(`/search/${encodeURIComponent(input)}`);
  }

}
