export class Article {

  public name :string;
  public sku : number;
  public released: string;
  public retired: string = null;
  public imagePath : string;
  public categoryId : number;

  constructor(name: string, sku: number, released: string, retired: string, imagePath: string, category: number){
    this.name = name;
    this.sku = sku;
    this.released = released;
    this.retired = retired;
    this.imagePath = imagePath;
    this.categoryId = category;

  }
}
