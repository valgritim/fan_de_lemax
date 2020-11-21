import { Injectable } from '@angular/core';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories : Category[] = [
    new Category("maisons", "assets/images/grand_opera.jpg", "Grand Opera House"),
    new Category("facades","assets/images/beersmith_facade.jpg","Beersmith facade"),
    new Category("personnages", "assets/images/cafe_society.jpg", "Cafe Society"),
    new Category("accessoires","assets/images/fountain.jpg", "Lighted Fountain"),
    new Category("animations","assets/images/ballroom.jpg", "Animated Ballroom"),

  ];

  constructor() { }

  getCategories() {
    return this.categories;
  }

  getCategoryById(index: number){
    return this.categories[index][0];
  }

}
