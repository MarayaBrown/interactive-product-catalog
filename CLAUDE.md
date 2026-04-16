# Proyecto: Interactive Product Catalog

## Overview
E-commerce product catalog for garden store built with vanilla JavaScript. Users can browse products, search/filter, and view product details.

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript
- No frameworks - pure DOM manipulation
- GitHub Pages for deployment

## Project Structure
```
/
├── index.html          # Main catalog page
├── articulo.html       # Product detail page
├── index.js           # Catalog logic
├── articulo.js        # Detail page logic
├── style.css          # All styles
├── articulos.json     # Product data
├── data/              # Product images
├── screenshots/       # README screenshots
└── README.md          # Project documentation
```

## Key Features
- Dynamic product rendering from JSON
- Real-time search/filter
- Product detail pages with localStorage
- Responsive design (mobile-first)
- Loading states & error handling
- Toast notifications (replaced alert())

## Important Patterns
- `escapeHtml()` - XSS protection for all user data
- `CONFIG` object - Centralized constants
- Loading/error states for better UX

## Live Demo
https://marayabrown.github.io/interactive-product-catalog/

## GitHub
https://github.com/MarayaBrown/interactive-product-catalog