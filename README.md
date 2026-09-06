# Naik Foods - Smart Product Discovery

A MERN stack prototype developed as part of the Naik Foods Full Stack MERN Internship Assignment.

## Project Overview

The project focuses on improving product discovery and shopping experience for an e-commerce food platform.

The prototype provides:

- Product search
- Category filtering
- Price filtering
- Product sorting
- Product ratings
- Product images
- Shopping cart
- Quantity management
- Remove from cart
- Free-delivery progress indicator
- Loading and error handling

## Technologies Used

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

## Architecture

React Frontend  
↓  
Express REST API  
↓  
MongoDB Atlas

## Main API

GET `/api/products`

Supported query parameters:

- `search`
- `category`
- `maxPrice`
- `sort`

Example:

`/api/products?search=khakhra`

## Features

### Smart Product Discovery

Users can search and filter products based on their requirements.

### Shopping Cart

Users can add products, increase or decrease quantity, remove products, and view the subtotal.

### Free Delivery Indicator

The cart displays progress toward the ₹999 free-delivery threshold.

## Project Structure

```text
naik-foods-project/
├── client/
├── server/
├── .gitignore
└── README.md