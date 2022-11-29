// The Open–closed principle: "Software entities ... should be open for extension, but closed for modification."

const Colors = Object.freeze({
  Red: "red",
  Green: "green",
  Blue: "blue",
});

const Sizes = Object.freeze({
  Small: "small",
  Medium: "medium",
  Large: "large",
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((product) => product.color === color);
  }

  filterBySize(products, size) {
    return products.filter((product) => product.size === size);
  }

  filterByColorAndSize(products, color, size) {
    return products.filter(
      (product) => product.color === color && product.size === size
    );
  }

  // Some additional filters...
  // state space explosion
  // 3 criteria (+weight) = 7 methods
  // OCP = open for extension, closed for modification
}

const apple = new Product("Apple", Colors.Green, Sizes.Small);
const tree = new Product("Tree", Colors.Green, Sizes.Large);
const house = new Product("House", Colors.Blue, Sizes.Large);

let products = [apple, tree, house];

const productFilter = new ProductFilter();

console.log(`Green products (old):`);
for (let p of productFilter.filterByColor(products, Colors.Green)) {
  console.log(` * ${p.name} is green`);
}
// ↑↑↑ BEFORE

// ↓↓↓ AFTER
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every((spec) => spec.isSatisfied(item));
  }
}

class BetterProductFilter {
  filter(products, specification) {
    return products.filter((product) => specification.isSatisfied(product));
  }
}

const betterProductFilter = new BetterProductFilter();

console.log(`Green products (new):`);
for (let p of betterProductFilter.filter(
  products,
  new ColorSpecification(Colors.Green)
)) {
  console.log(` * ${p.name} is green`);
}

console.log(`Large and green products:`);
for (let p of betterProductFilter.filter(
  products,
  new AndSpecification(
    new ColorSpecification(Colors.Green),
    new SizeSpecification(Sizes.Large)
  )
))
  console.log(` * ${p.name} is large and green`);
