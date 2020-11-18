import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories : Category[];
  id : number;
  category: string;

  constructor(private categoryService : CategoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();

  }

}
