import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Product } from '../dto/product.model';
import { Category } from '../dto/category.model';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // public products: Product[] = [
  //   new Product(
  //     'Vitamin A-10 000 IU',
  //     Category.Vitamins,
  //     '100 softgels',
  //     'What is vitamin A?<br><br>Vitamin A is actually a group of fat-soluble retinoids and carotenoids, chemical compounds that are a part of, or chemically related to, vitamin A. There are two types of vitamin A found in our diet - preformed vitamin retinoids (also known as retinol and its esterified form, retinyl ester) and provitamin A carotenoids (beta-carotene, alpha-carotene, and others).<br><br>Why is vitamin A important for my health?<br><br>* Vitamin A is important for numerous body functions including normal visual function, immune system health, healthy bones and teeth, and healthy skin.<br>* Our bodies need vitamin A to utilize protein.<br>* Vitamin A is also an antioxidant that protects against free radical damage.<br><br>Are beta-carotene and vitamin A the same thing?<br><br>Beta-carotene is classified as a carotenoid, which is in the vitamin A family. Carotenoids are organic pigments that are found in plants and fruits. Once ingested, beta-carotene can be converted to vitamin A in the liver. Beta-carotene is only converted to vitamin A as needed by the body, making it a safe source.',
  //     'https://vitamin4e.com/wp-content/uploads/2044-2.jpg',
  //     19.99
  //   ),
  //   new Product(
  //     'Vitamin B-100 Complex',
  //     Category.Vitamins,
  //     '100 veg capsules',
  //     'B-100 Caps provide a full complement of B-Vitamins plus Choline and Inositol. These vitamins work to support energy production, maintain healthy homocysteine metabolism, and promote the health of the nervous system. B-Vitamins are water soluble and with the exception of B-12, have limited storage in the body and thus require daily replenishment. While B-12 is stored in the liver, dietary sources are of animal origin only (meat and dairy) and supplementation with B-12 may be especially important for vegetarians.',
  //     'https://vitamin4e.com/wp-content/uploads/b-100-complex-100-kapsuli-595-800x800-1.jpg',
  //     54.99
  //   ),
  //   new Product(
  //     'Vitamin C-1000',
  //     Category.Vitamins,
  //     '100 tablets',
  //     '*Vitamin C is a water soluble nutrient well known for its vital role in the immune system.<br><br>* Vitamin C is also necessary for the production of collagen (a structural protein in connective tissue) and is therefore important for skin, bone, and joint health.<br><br>* Vitamin C is needed for amino acid metabolism, neurotransmitter synthesis, and the utilization of many nutrients, such as folic acid and iron.<br><br>* It is also a highly effective antioxidant that can help maintain healthy tissues by neutralizing free radicals generated during normal metabolism and exposure to environmental stressors.<br><br>* This unique blend includes rose hips and bioflavonoids which work synergistically with vitamin C.',
  //     'https://vitamin4e.com/wp-content/uploads/6-8.jpg',
  //     32.99
  //   ),
  //   new Product(
  //     'Vitamin D-1000 IU',
  //     Category.Vitamins,
  //     '180 softgels',
  //     'NOW® Vitamin D-3 softgels supply this key vitamin in a highly absorbable liquid softgel form. Vitamin D is normally obtained from the diet or produced by the skin from the ultraviolet energy of the sun. However, it is not abundant in food. As more people avoid sun exposure, vitamin D supplementation becomes even more necessary to ensure that your body receives an adequate supply.',
  //     'https://vitamin4e.com/wp-content/uploads/2068-2.jpg',
  //     24.99
  //   ),
  //   new Product(
  //     'Liquid Vitamin D-3',
  //     Category.Vitamins,
  //     '60 ml',
  //     'Each drop contains 100 IU of Vitamin D, 4 drops provide 400 IU, 20 drops provide 2,000 IU.<br><br>Suggested use<br><br>Shake well. For adults, take 4 drops 1 to 5 times daily. For children, administer 4 drops once daily. Do not exceed recommended dose. Take directly or add to your favorite beverage. If the dropper contacts the lips or oral tissues, thoroughly wash and dry it before replacing in the bottle and closing it completely.<br><br>Best when taken with a fat-containing meal.',
  //     'https://vitamin4e.com/wp-content/uploads/1201-3.jpg',
  //     27.99
  //   ),
  //   new Product(
  //     'Iron- 18 mg',
  //     Category.Minerals,
  //     '120 veg capsules',
  //     '* Iron is an essential mineral that plays central roles in energy production, immune system function, and neurological health.<br><br>* Iron is an essential component of hemoglobin, a molecule that transports oxygen to the cells of the body, and myoglobin, which binds oxygen used in muscle tissues.<br><br>* NOW uses Ferrochel™ Iron Bisglycinate, which has clinically demonstrated superior absorption and is well tolerated because it is gentle and non-constipating.',
  //     'https://vitamin4e.com/wp-content/uploads/2024-3.jpg',
  //     30.99
  //   ),
  //   new Product(
  //     'Kelp Natural Iodine - 150 mcg',
  //     Category.Minerals,
  //     '200 tablets',
  //     'Kelp is a large, leafy seaweed belonging to the brown algae family that grows in "forests" in the colder waters of the world\'s oceans. Kelp has been used for centuries as an important nutritious staple ingredient in Chinese, Japanese, and Korean cuisines. It is also an excellent source of iodine, which has been shown to be essential for healthy thyroid function.<br><br>* 150 mcg of Natural Iodine<br><br>* Supports Healthy Thyroid Function<br><br>* Easier to Swallow Tablet',
  //     'https://vitamin4e.com/wp-content/uploads/2026-3.jpg',
  //     25.99
  //   ),
  //   new Product(
  //     'Magnesium Citrate',
  //     Category.Minerals,
  //     '120 veg capsules',
  //     '* Magnesium is a mineral that is critical for energy production and metabolism, muscle contraction, nerve impulse transmission, and bone mineralization.<br><br>* It is a required cofactor for an estimated 300 enzymes.<br><br>* Among the reactions catalyzed by these enzymes are fatty acid synthesis, protein synthesis, and glucose metabolism.<br><br>* Magnesium status is also important for regulation of calcium balance through its effects on the parathyroid gland.<br><br>* Magnesium citrate is easily absorbed, and NOW® Magnesium Citrate Softgels are provided in a liquid base with chelated forms for superior bioavailability.',
  //     'https://vitamin4e.com/wp-content/uploads/1-60.jpg',
  //     46.99
  //   ),
  //   new Product(
  //     'Whey Protein Isolate Natural Vanilla',
  //     Category.Sports,
  //     '2268 g',
  //     'NOW® Whey Protein Isolate is a high quality protein that is both bioavailable and easily digested. Whey protein has naturally occurring branched-chain amino acids (BCAAs). NOW® Whey Protein Isolate is ideal for active individuals.<br><br>Whey protein is considered to have the highest biological value (BV) of any protein source - superior in essential amino acid content to beef, milk, casein or soy.<br><br>Suggested use<br><br>Add 1 level scoop daily to 8 oz. of cold water, milk, or your favorite juice. Stir or blend.',
  //     'https://vitamin4e.com/wp-content/uploads/5989-3.jpg',
  //     263.49
  //   ),
  //   new Product(
  //     'Chicken Protein Bone Broth',
  //     Category.Sports,
  //     '544 g',
  //     'NOW® Sports Chicken Bone Broth Powder is a premium quality chicken bone extract that has 29 g of protein per serving. Chicken Bone Broth Powder is a common food base in many cultures and a naturally occurring protein, amino acids, collagen and more. This paleo-friendly protein product is made without artificial ingredients, and is free of many common allergens, making it an ideal protein for individuals with food sensitivities. NOW® Sports Chicken Bone Broth Powder can be mixed in water and is a tasty and convenient way to ensure you’re getting the protein your active lifestyle requires.<br><br>* This chicken bone broth powder typically has 43% naturally occurring collagen.<br><br>Suggested use<br><br>Add 1 level scoop daily to 8 oz. of water or other beverage. To improve mixability, slowly add powder to boiling water and whisk continuously until the powder has dissolved. May be added to soups, sauces, or other foods.',
  //     'https://vitamin4e.com/wp-content/uploads/1962_mainimage_0-800x800-1.jpg',
  //     77.34
  //   ),
  //   new Product(
  //     'Creatine Monohydrate 750 mg',
  //     Category.Sports,
  //     '120 capsules',
  //     "Creatine is a compound that occurs naturally in the body, primarily in skeletal muscle. Creatine's function is to serve as a precursor to adenosine Triphosphate (ATP), the form of chemical energy used by all cells. Body stores of Creatine create a pool of readily available ATP for energy, which is necessary for fueling quick bursts of power and strength. Studies have demonstrated that creatine supplementation can help to maintain existing muscle tissue, support the growth and development of lean mass, and promote optimal performance during short bouts of intense exercise. NOW® Creatine Monohydrate has no additives or preservatives.<br><br>Suggested use<br><br>Take 6 capsules with fruit juice or other sweetened liquid 3 to 4 times daily, before and after exercise, for the first 7 days. Thereafter, for maintenance use, consume 6 capsules 1 to 3 times daily. Allow 3 to 4 hours between doses. For continuous use beyond 28 days, use one serving (6 capsules) daily. Consume plenty of fluids with this product.",
  //     'https://vitamin4e.com/wp-content/uploads/5995-3.jpg',
  //     48.13
  //   ),
  //   new Product(
  //     'MSM Methylsulfonylmethane 1000 mg',
  //     Category.Health,
  //     '120 capsules',
  //     "MSM (Methylsulfonylmethane) is a sulfur-bearing compound that is naturally present in very small amounts in fruits, vegetables, grains, animal products, and some algae. Sulfur compounds are found in all body cells and are indispensable for life. MSM, in its role in the body's sulfur cycle, helps to create the chemical links needed to form and maintain numerous different types of structural tissues of the human body, including connective tissues, such as articular cartilage and skin.<br><br>Suggested use<br><br>Take 2 capsules 1 to 2 times daily with food. If intestinal gas occurs, reduce dosage.",
  //     'https://vitamin4e.com/wp-content/uploads/1311-3.jpg',
  //     38.63
  //   ),
  //   new Product(
  //     'Ashwagandha 450 mg',
  //     Category.Health,
  //     '90 veg capsules',
  //     'Ashwagandha (Withania somnifera) is an herb that is extensively used in Ayurveda, the traditional herbal system in India. Ashwagandha is used as a general tonic and "adaptogen", helping the body adapt to temporary normal stress. In addition, preliminary data suggest that ashwagandha supports a healthy immune system.<br><br>Suggested use<br><br>Take 1 capsule 2 to 3 times daily',
  //     'https://vitamin4e.com/wp-content/uploads/2003-3.jpg',
  //     47.94
  //   ),
  //   new Product(
  //     'Aloe Vera Gels',
  //     Category.Health,
  //     '100 softgels',
  //     "Aloe vera offers a variety of nutrients, including vitamins, minerals, enzymes and amino acids. Aloe vera's constituent mucopolysaccharides, also known as glycosaminoglycans (GAGs), are thought to be its active components. Scientific studies have indicated that aloe can help to support the body's own healing processes. In addition, aloe vera has been shown to support a healthy digestive system.<br><br>Suggested use<br><br>Take 2 softgels 1 to 2 times daily, on an empty stomach.",
  //     'https://vitamin4e.com/wp-content/uploads/1297-2.jpg',
  //     35.6
  //   ),
  // ];

  // public favorites = [
  //   {
  //     userId: '3tQp4eQ2UFN6tSr4mKjMGR0XrtI3',
  //     favorites: [
  //       new Product(
  //         'Aloe Vera Gels',
  //          Category.Health,
  //         '100 softgels',
  //         "Aloe vera offers a variety of nutrients, including vitamins, minerals, enzymes and amino acids. Aloe vera's constituent mucopolysaccharides, also known as glycosaminoglycans (GAGs), are thought to be its active components. Scientific studies have indicated that aloe can help to support the body's own healing processes. In addition, aloe vera has been shown to support a healthy digestive system.<br><br>Suggested use<br><br>Take 2 softgels 1 to 2 times daily, on an empty stomach.",
  //         'https://vitamin4e.com/wp-content/uploads/1297-2.jpg',
  //         35.6
  //       ),
  //     ],
  //   },
  // ];
  productChanged = new Subject<Product[]>();
  public products: Product[] = [];

  private dbPath = '/products';
  productsRef: AngularFireList<Product>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.productsRef = this.db.list(this.dbPath);
  }

  getAll(): AngularFireList<any> {
    return this.productsRef;
  }

  storeProducts() {
    // this.http
    //   .post(
    //     'https://test-app-4e5fa-default-rtdb.europe-west1.firebasedatabase.app/favorites.json',
    //     this.favorites
    //   )
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
    // this.http
    //   .get(
    //     'https://test-app-4e5fa-default-rtdb.europe-west1.firebasedatabase.app/favorites.json'
    // ).subscribe(data=>console.log(data));
  }

  getProducts() {
    return this.products.slice();
  }

  fetchProducts() {
    return this.http
      .get<Product[]>(
        'https://test-app-4e5fa-default-rtdb.europe-west1.firebasedatabase.app/products.json'
      )
      .pipe(tap((data) => this.setProducts(data)));
  }

  setProducts(data: Product[]) {
    this.products = data;
    this.productChanged.next(this.products.slice());
  }

  getProduct(index: number) {
    return this.products[index];
  }
}
