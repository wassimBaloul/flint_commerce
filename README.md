
# FLINT | E-Commerce

Flint is a fully functional e-commerce application built on top of MERN stack (MongoDB, Express.js, React and Node.js).
It facilitates administrators with effective tools to manage the store as well as enable customers to browse and purchase products from the store.

**Live App**: [https://flint-store.onrender.com](https://flint-store.onrender.com)

> ⚠️ **Important**: Kindly note that Render's free tier  spin's down with inactivity. As a result, it may take upto a minute to serve the intial request due to cold start of the instance.

| Role | Email     | Password                |
| :-------- | :------- | :------------------------- |
| `ADMIN` | `noah_reed@gmail.com` | `noah^123`|
| `CUSTOMER` | `jasper@gmail.com` | `jasper^123`|
| `CUSTOMER` | `liam_brooks@gmail.com` | `liam^123`|

## Features

- Responsive across all devices, ensuring a seamless experience on mobile, tablet, and desktop.  

- Implemented pagination across several pages for efficient navigation.  
 
- JWT-based login and signup process for secure user authentication.

### Customer Interface

- **Home Page**:  
  - Features an interactive carousel showcasing the latest sales, collections, and offers.  
  - Highlights top brands, newly launched products, and featured collections to attract user attention.  

- **Comprehensive Collection Page**:  
  - Displays product catalog with suitable filtering options (category, brand) and sorting capabilities (by price, title, or date) enabling customers to find desired products quickly.

- **Detailed Product Pages**:  
  - Displays detailed information about the product such as images, rating, pricing  and much more. 
  - Enables customers to view available sizes, select preferences, and add products to their cart.
  - Admins are restricted from purchasing products or leaving reviews, maintaining role integrity.  

- **Product Suggestions**:  
  - Recommends similar products to that of the selected product on the product detail page thereby, improving order size and average order value.

- **Customer Reviews and Ratings**:  
  - Enables customers to rate products and leave their comments. 

- **Shopping Cart**:  
  - Allows customers to manage their cart, adjust quantities and checkout seamlessly.  

- **Customer Order Management**:  
  - Users can access order history with essential details such as order date, total, and status.  
  - Includes a detailed view of orders, showing bills, addresses, and payment methods.  

- **Address Management**:  
  - Users can add, edit, and manage multiple delivery addresses with specific details like contact and landmarks.  

- **Product Search**:  
  - Enables customers to efficiently search products based on keywords for titles, descriptions, brands, and categories improving product discovery. 

- **Checkout and Payment Integration**:  
  - Allows users to select delivery address and view order summary ensuring smooth checkout experience. 
  - Integrated with Stripe for fast and secure payment processing.   

### Admin Interface

- **Comprehensive Admin Dashboard**:  
  - Divided into Sales, Orders, and Products sections, each with detailed analytics that help admins monitor KPI's and identify trends.  
  - Offers single-value metrics and graphical trends filtered by preset time-period options.

- **Product Management**:  
  - Allows admins to add, edit, and delete products with all necessary details, including images, sizes, and sale prices. 
  - Enables admins to feature products. 
  - Filtering options allows admins to monitor products based on category, brands and stock levels ensuring timely restocking. 

- **Order Management**:  
  - Admins can view and update order statuses, with filtering options based on order status.  
  - A detailed view provides a complete breakdown of each order. 

- **Banner Management**:  
  - Admins can manage store banners to showcase new collections, sales, and promotions.  
  - Admins can upload and remove banners as needed.  
     

## Tech Stack

### Client
- **React**: JS library for building user interfaces
- **Redux**: State management and middleware to perform async actions. 
- **Axios**: HTTP client  
- **Recharts**: Charting library
- **TailwindCSS**: Utility-first CSS framework.  
- **Shadcn**: UI Library 

### Server
- **Node.js** : Server-side runtime environment  
- **Express.js** : Framework for handling requests and managing middleware.  
- **MongoDB** : NoSQL database 
- **Mongoose** : ODM for MongoDB  
- **Bcrypt.js** : Password hashing 
- **Multer** : Middleware for file uploads.
- **JWT (JSON Web Tokens)** : Token based authentication. 

### Platforms
- **Cloudinary**: Media store and asset management
- **Stripe**: Payment gateway  



## Account Creation

To get started with this project, please create accounts for the following tools:

1. Create your [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and get your MongoDB connection string.

2. Create your [Cloudinary](https://cloudinary.com/users/register/free) account and get your cloud name, API key as well as API secret.

3. Create your [Stripe](https://dashboard.stripe.com/register) account and get your secret key.

> ⚠️ **Important**: This project requires MongoDB Atlas for full functionality, as it uses transactions, which are only supported on MongoDB replica sets.  Local MongoDB setups may not support transactions unless configured as a replica set.

## Installation

1. Clone this repository to your local machine.

```bash
  git clone https://gitlab.com/Rithik_R/Flint.git
```

```bash
  cd <project-folder>
```

2. Install Client dependencies

```bash
  cd client
  npm install
```

3. Install Server dependencies

```bash
  cd server
  npm install
```

## Environment Variables

Add the following environment variables to your .env file directly under `client/` and `server/` respectively.

### CLIENT
```dotenv
VITE_SERVER_BASE_URL=ADD_YOUR_SERVER_BASE_URL
VITE_PRODUCTS_PER_PAGE=16 # Limits 16 products per page
VITE_GITHUB_URL=ADD_YOUR_GITHUB_URL
VITE_LINKEDIN_URL=ADD_YOUR_LINKEDIN_URL
```

### SERVER
```dotenv
PORT=4000
MONGO_URL=ADD_YOUR_MONGODB_URL
CLIENT_URL=ADD_YOUR_CLIENT_BASE_URL
HASH_SALT=14
JWT_SECRET_KEY=ADD_JWT_SECRET_KEY
CLOUDINARY_CLOUD_NAME=ADD_YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=ADD_YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=ADD_YOUR_CLOUDINARY_API_SECRET
STRIPE_SECRET_KEY=ADD_YOUR_STRIPE_SECRET_KEY
```

## Seed Database

To populate the database with sample data, run the following command inside the **server directory**.

```bash
  npm run seed
```

This will:

- Upload images to cloudinary
- Create users and populate the database with initial set of data


## Run Development Server

1. Start the server

```bash
  cd server
  npm run dev
```
The server will start on http://localhost:4000 by default.

2. Start the client

```bash
  cd client
  npm run dev
```
The client will start on http://localhost:3000 by default.


## Build and Deployment

To create a production build of client, run

```bash
  cd client
  npm run build
```

