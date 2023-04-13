import { Product } from "../dto/product.model";
import { Category } from "../dto/category.model";

export class ProductService {
  public products: Product[] = [
    new Product(
      'Vitamin A-10 000 IU',
       Category.Vitamins,
      '100 softgels',
      'What is vitamin A?<br><br>Vitamin A is actually a group of fat-soluble retinoids and carotenoids, chemical compounds that are a part of, or chemically related to, vitamin A. There are two types of vitamin A found in our diet - preformed vitamin retinoids (also known as retinol and its esterified form, retinyl ester) and provitamin A carotenoids (beta-carotene, alpha-carotene, and others).<br><br>Why is vitamin A important for my health?<br><br>* Vitamin A is important for numerous body functions including normal visual function, immune system health, healthy bones and teeth, and healthy skin.<br>* Our bodies need vitamin A to utilize protein.<br>* Vitamin A is also an antioxidant that protects against free radical damage.<br><br>Are beta-carotene and vitamin A the same thing?<br><br>Beta-carotene is classified as a carotenoid, which is in the vitamin A family. Carotenoids are organic pigments that are found in plants and fruits. Once ingested, beta-carotene can be converted to vitamin A in the liver. Beta-carotene is only converted to vitamin A as needed by the body, making it a safe source.',
      'https://vitamin4e.com/wp-content/uploads/2044-2.jpg',
      19.99
    ),
    new Product(
      'Vitamin B-100 Complex',
      Category.Vitamins,
      '100 veg capsules',
      'B-100 Caps provide a full complement of B-Vitamins plus Choline and Inositol. These vitamins work to support energy production, maintain healthy homocysteine metabolism, and promote the health of the nervous system. B-Vitamins are water soluble and with the exception of B-12, have limited storage in the body and thus require daily replenishment. While B-12 is stored in the liver, dietary sources are of animal origin only (meat and dairy) and supplementation with B-12 may be especially important for vegetarians.',
      'https://vitamin4e.com/wp-content/uploads/b-100-complex-100-kapsuli-595-800x800-1.jpg',
      54.99
    ),
    new Product(
      'Vitamin C-1000',
       Category.Vitamins,
      '100 tablets',
      '*Vitamin C is a water soluble nutrient well known for its vital role in the immune system.<br><br>* Vitamin C is also necessary for the production of collagen (a structural protein in connective tissue) and is therefore important for skin, bone, and joint health.<br><br>* Vitamin C is needed for amino acid metabolism, neurotransmitter synthesis, and the utilization of many nutrients, such as folic acid and iron.<br><br>* It is also a highly effective antioxidant that can help maintain healthy tissues by neutralizing free radicals generated during normal metabolism and exposure to environmental stressors.<br><br>* This unique blend includes rose hips and bioflavonoids which work synergistically with vitamin C.',
      'https://vitamin4e.com/wp-content/uploads/6-8.jpg',
      32.99
    ),
    new Product(
      'Vitamin D-1000 IU',
       Category.Vitamins,
      '180 softgels',
      'NOW® Vitamin D-3 softgels supply this key vitamin in a highly absorbable liquid softgel form. Vitamin D is normally obtained from the diet or produced by the skin from the ultraviolet energy of the sun. However, it is not abundant in food. As more people avoid sun exposure, vitamin D supplementation becomes even more necessary to ensure that your body receives an adequate supply.',
      'https://vitamin4e.com/wp-content/uploads/2068-2.jpg',
      24.99
    ),
    new Product(
      'Liquid Vitamin D-3',
       Category.Vitamins,
      '60 ml',
      'Each drop contains 100 IU of Vitamin D, 4 drops provide 400 IU, 20 drops provide 2,000 IU.<br><br>Suggested use<br><br>Shake well. For adults, take 4 drops 1 to 5 times daily. For children, administer 4 drops once daily. Do not exceed recommended dose. Take directly or add to your favorite beverage. If the dropper contacts the lips or oral tissues, thoroughly wash and dry it before replacing in the bottle and closing it completely.<br><br>Best when taken with a fat-containing meal.',
      'https://vitamin4e.com/wp-content/uploads/1201-3.jpg',
      27.99
    ),
    new Product(
      'Iron- 18 mg',
       Category.Minerals,
      '120 veg capsules',
      '* Iron is an essential mineral that plays central roles in energy production, immune system function, and neurological health.<br><br>* Iron is an essential component of hemoglobin, a molecule that transports oxygen to the cells of the body, and myoglobin, which binds oxygen used in muscle tissues.<br><br>* NOW uses Ferrochel™ Iron Bisglycinate, which has clinically demonstrated superior absorption and is well tolerated because it is gentle and non-constipating.',
      'https://vitamin4e.com/wp-content/uploads/2024-3.jpg',
      30.99
    ),
    new Product(
      'Kelp Natural Iodine - 150 mcg',
       Category.Minerals,
      '200 tablets',
      'Kelp is a large, leafy seaweed belonging to the brown algae family that grows in "forests" in the colder waters of the world\'s oceans. Kelp has been used for centuries as an important nutritious staple ingredient in Chinese, Japanese, and Korean cuisines. It is also an excellent source of iodine, which has been shown to be essential for healthy thyroid function.<br><br>* 150 mcg of Natural Iodine<br><br>* Supports Healthy Thyroid Function<br><br>* Easier to Swallow Tablet',
      'https://vitamin4e.com/wp-content/uploads/2026-3.jpg',
      25.99
    ),
    new Product(
      'Magnesium Citrate',
       Category.Minerals,
      '120 veg capsules',
      '* Magnesium is a mineral that is critical for energy production and metabolism, muscle contraction, nerve impulse transmission, and bone mineralization.<br><br>* It is a required cofactor for an estimated 300 enzymes.<br><br>* Among the reactions catalyzed by these enzymes are fatty acid synthesis, protein synthesis, and glucose metabolism.<br><br>* Magnesium status is also important for regulation of calcium balance through its effects on the parathyroid gland.<br><br>* Magnesium citrate is easily absorbed, and NOW® Magnesium Citrate Softgels are provided in a liquid base with chelated forms for superior bioavailability.',
      'https://vitamin4e.com/wp-content/uploads/1-60.jpg',
      46.99
    ),
  ];

  getProducts() {
    return this.products.slice();
  }

  getProduct(index:number){
    return this.products[index];
  }
}