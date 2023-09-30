#!/usr/bin/env node

console.log('This script populates categories and items to your database.');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Item = require('./models/item');

const categories = [];
const items = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createItems();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function categoryCreate(name, description, image) {
  const category = new Category({ name, description, image });
  await category.save();
  categories.push(category);
  console.log(`Added category: ${name}`);
}

async function itemCreate(name, description, category, price, number_in_stock, image) {
  const item = new Item({ name, description, category, price, number_in_stock, image });
  await item.save();
  items.push(item);
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate('Fruits', 'Fresh and delicious fruits', 'fruits.jpg'),
    categoryCreate('Vegetables', 'Healthy vegetables for your meals', 'vegetables.jpg'),
    categoryCreate('Dairy Products', 'Milk, cheese, and more', 'dairy.jpg'),
    categoryCreate('Meat and Poultry', 'Quality cuts of meat', 'meat.jpg'),
    categoryCreate('Bakery', 'Freshly baked goods', 'bakery.jpg'),
    categoryCreate('Canned Goods', 'Convenient canned items', 'canned.jpg'),
  ]);
}

async function createItems() {
  console.log('Adding items');
  // For each category, we'll add more items with different details.
  const itemDetails = [
    // Fruits
    [
      ['Apple', 'Crisp and sweet', 0.99, 100, 'apple.jpg'],
      ['Banana', 'Rich in potassium', 0.49, 150, 'banana.jpg'],
      ['Orange', 'Vitamin C goodness', 0.79, 120, 'orange.jpg'],
      ['Strawberry', 'Sweet and juicy', 1.29, 90, 'strawberry.jpg'],
      ['Grapes', 'Variety of flavors', 1.99, 80, 'grapes.jpg'],
      ['Watermelon', 'Refreshing and hydrating', 3.99, 30, 'watermelon.jpg'],
      ['Mango', 'Exotic and aromatic', 2.49, 60, 'mango.jpg'],
      ['Kiwi', 'Rich in vitamin C', 0.79, 100, 'kiwi.jpg'],
      ['Pineapple', 'Tropical delight', 2.99, 50, 'pineapple.jpg'],
      ['Cherry', 'Sweet and tart', 1.49, 70, 'cherry.jpg'],
    ],
    // Vegetables
    [
      ['Carrot', 'Healthy and crunchy', 0.39, 200, 'carrot.jpg'],
      ['Broccoli', 'Nutrient-packed', 0.79, 80, 'broccoli.jpg'],
      ['Lettuce', 'Crisp and leafy', 1.19, 60, 'lettuce.jpg'],
      ['Cucumber', 'Cool and refreshing', 0.69, 120, 'cucumber.jpg'],
      ['Spinach', 'Iron-rich greens', 1.29, 90, 'spinach.jpg'],
      ['Tomato', 'Versatile and ripe', 0.89, 140, 'tomato.jpg'],
      ['Bell Pepper', 'Colorful and crunchy', 0.99, 100, 'bell_pepper.jpg'],
      ['Zucchini', 'Great for grilling', 0.79, 110, 'zucchini.jpg'],
      ['Potato', 'Perfect for fries', 0.49, 180, 'potato.jpg'],
      ['Onion', 'Essential for cooking', 0.69, 150, 'onion.jpg'],
    ],
    // Dairy Products
    [
      ['Milk', 'Fresh dairy milk', 2.49, 50, 'milk.jpg'],
      ['Cheese', 'Variety of cheeses', 3.99, 30, 'cheese.jpg'],
      ['Yogurt', 'Creamy and healthy', 1.99, 70, 'yogurt.jpg'],
      ['Butter', 'Rich and creamy', 2.19, 40, 'butter.jpg'],
      ['Cream', 'For baking and cooking', 1.79, 60, 'cream.jpg'],
      ['Eggs', 'Farm-fresh eggs', 1.29, 90, 'eggs.jpg'],
      ['Sour Cream', 'Perfect for dips', 1.59, 50, 'sour_cream.jpg'],
      ['Cottage Cheese', 'Great for snacks', 2.29, 30, 'cottage_cheese.jpg'],
      ['Mozzarella', 'Pizza-ready cheese', 2.99, 40, 'mozzarella.jpg'],
      ['Whipped Cream', 'For desserts', 2.79, 30, 'whipped_cream.jpg'],
    ],
    // Meat and Poultry
    [
      ['Chicken Breast', 'Lean and tender', 4.99, 60, 'chicken_breast.jpg'],
      ['Ground Beef', 'Versatile and flavorful', 5.49, 40, 'ground_beef.jpg'],
      ['Pork Chops', 'Savory and delicious', 6.99, 50, 'pork_chops.jpg'],
      ['Salmon', 'Heart-healthy fish', 7.99, 30, 'salmon.jpg'],
      ['Ground Turkey', 'Lean and protein-packed', 4.49, 60, 'ground_turkey.jpg'],
      ['Lamb Chops', 'Gourmet delight', 9.99, 20, 'lamb_chops.jpg'],
      ['Sausages', 'Great for grilling', 3.99, 70, 'sausages.jpg'],
      ['Bacon', 'Crispy breakfast favorite', 4.79, 40, 'bacon.jpg'],
      ['Tuna Steak', 'For seafood lovers', 8.99, 30, 'tuna_steak.jpg'],
      ['Duck Breast', 'Exquisite and rich', 12.99, 20, 'duck_breast.jpg'],
    ],
    // Bakery
    [
      ['Baguette', 'Crusty French bread', 2.29, 40, 'baguette.jpg'],
      ['Croissant', 'Buttery and flaky', 1.49, 60, 'croissant.jpg'],
      ['Ciabatta', 'Perfect for sandwiches', 2.79, 30, 'ciabatta.jpg'],
      ['Sourdough', 'Artisanal flavor', 2.49, 40, 'sourdough.jpg'],
      ['Cinnamon Roll', 'Sweet indulgence', 1.99, 50, 'cinnamon_roll.jpg'],
      ['Muffin', 'Great for breakfast', 0.99, 80, 'muffin.jpg'],
      ['Pretzel', 'Salty snack', 1.29, 70, 'pretzel.jpg'],
      ['Brownie', 'Chocolate delight', 1.79, 40, 'brownie.jpg'],
      ['Danish Pastry', 'Flavorful pastry', 2.29, 30, 'danish_pastry.jpg'],
      ['Bagel', 'Classic breakfast', 1.49, 60, 'bagel.jpg'],
    ],
    // Canned Goods
    [
      ['Canned Beans', 'Quick and easy', 1.19, 120, 'canned_beans.jpg'],
      ['Canned Soup', 'Warm and comforting', 1.99, 80, 'canned_soup.jpg'],
      ['Canned Tuna', 'Protein-packed', 1.79, 100, 'canned_tuna.jpg'],
      ['Canned Corn', 'Versatile side', 0.99, 140, 'canned_corn.jpg'],
      ['Canned Tomatoes', 'For sauces', 1.29, 120, 'canned_tomatoes.jpg'],
      ['Canned Vegetables', 'Convenient veggies', 1.39, 100, 'canned_vegetables.jpg'],
      ['Canned Fruit', 'Sweet and ready', 1.49, 90, 'canned_fruit.jpg'],
      ['Canned Chicken', 'Easy protein', 2.29, 70, 'canned_chicken.jpg'],
      ['Canned Pasta', 'Kid-friendly', 1.29, 80, 'canned_pasta.jpg'],
      ['Canned Soup Mix', 'Variety of flavors', 1.59, 60, 'canned_soup_mix.jpg'],
    ],
  ];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    for (let j = 0; j < itemDetails[i].length; j++) {
      const [name, description, price, number_in_stock, image] = itemDetails[i][j];
      await itemCreate(name, description, category, price, number_in_stock, image);
    }
  }
}
