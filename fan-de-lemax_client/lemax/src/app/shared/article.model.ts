export class Article {

  public name :string;
  public sku : number;
  public release: string;
  public retired: string = null;
  public imagePath : string;
  public category : number;

  constructor(name: string, sku: number, release: string, retired: string, imagePath: string, category: number){
    this.name = name;
    this.sku = sku;
    this.release = release;
    this.retired = retired;
    this.imagePath = imagePath;
    this.category = category;

  }
}
