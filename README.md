# GrocifyPro: Inventory Management

Welcome to GrocifyPro, your go-to solution for efficient inventory management. This project was created to help businesses keep track of their items and categories effortlessly. In this README, I'll take you through the journey of how GrocifyPro was developed, step by step.

## Demo

![gif](./gifs/demo.gif)

[Live Demo](https://inventory-management-production-d2d7.up.railway.app/catalog)
## Project Overview

### Step 1: Planning

Before diving into code, it's essential to plan your project thoroughly. Start by defining the models and their attributes. In our case, we needed two main models: `Category` and `Item`. Here's what we decided:

**Category Model:**
- Fields: `name`, `description`, and `URL`.

**Item Model:**
- Fields: `name`, `description`, `category`, `price`, `number_in_stock`, and `URL`.

### Step 2: Setting Up the Environment

To kickstart the project, I used the Express.js framework, and for templating, I chose Pug. I generated the boilerplate skeleton with `express-generator`. This step provided us with a basic structure for our application.

### Step 3: Creating the Database

To store our data, I opted for MongoDB, a NoSQL database. I created a new MongoDB collection using the web interface, and then it was time to set up our database schemas and models.

### Step 4: Populating the Database

In this step, I needed to populate our database with sample data. To do this, I used a script similar to the one in the MDN tutorial. The script filled our database with initial data, making it ready for further development.

### Step 5: Setting Up Routes and Controllers

With our database ready, it was time to create routes and controllers. Routes define the URL endpoints, while controllers handle the logic for these endpoints. I established routes and controllers for both categories and items.

### Step 6: Creating Views

Creating views is a crucial part of any web application. I built all the 'READ' views, which allowed users to view categories and items. These views presented the data from the database in a user-friendly format.

### Step 7: Adding CRUD Functionality

To make our application truly powerful, I implemented CRUD (Create, Read, Update, Delete) functionality. This included creating forms for adding and updating categories and items. Controllers were developed to handle these actions.

### Step 8: Bonus - Image Uploads

As a bonus feature, I tackled the challenge of adding and uploading images for each item. To accomplish this, I integrated Express middleware for handling file uploads. The documentation provided in the middleware's README was instrumental in making this feature a reality.

## Conclusion

GrocifyPro is now a robust inventory management system that simplifies the process of tracking items and categories for businesses. It allows users to view, add, update, and delete items and categories effortlessly. Plus, the image upload functionality adds a visual dimension to the inventory management process.