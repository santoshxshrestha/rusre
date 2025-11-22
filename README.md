# rusre - Quote API Learning Project 🦀

A simple Rust web application using **Actix Web** to learn API creation fundamentals. This project parses a JSON file containing quotes and serves them through a web API with a frontend interface.

## Learning Goals

- Understanding **Actix Web** framework
- JSON file parsing with **serde**
- Creating REST API endpoints
- Template rendering with **Askama**
- Shared application state management
- Static file serving

## Key Learning Concepts

### 1. **JSON Parsing**

- Using `serde` to deserialize JSON into Rust structs
- File I/O with `std::fs::read_to_string`
- Error handling with `expect()`

### 2. **Shared State**

- Using `Arc<T>` for thread-safe reference counting
- Sharing data between HTTP handlers with `web::Data<T>`
- Cloning Arc pointers (cheap operation)

### 3. **HTTP Handlers**

- Route handlers with `#[get("/path")]` macros
- Returning different response types
- JSON serialization with `.json()`

### 4. **Template Rendering**

- Askama template integration
- Struct-based templates with `#[derive(Template)]`
- HTML template rendering

### 5. **Static File Serving**

- Serving static assets with `actix-files`
- Directory listing with `.show_files_listing()`

```bash
# Get a random quote
curl http://localhost:8080/quote/random

# Get the home page
curl http://localhost:8080/
```

## Extending the Project

Try these improvements to learn more, and see what has already been implemented.

### Implemented Features
- Random quote endpoint `/quote/random`
- Search endpoint `/quote/search?keyword=&category=` with optional `keyword` and `category` filters
- Category list endpoint `/catagory` (returns available categories for the client select)
- Accessible, semantic HTML (skip links, landmarks, ARIA live regions)
- Frontend enhancements: dynamic search results, loading/error states, responsive design, reduced-motion support
- Design tokens via CSS variables for easier theming

### Possible Next Enhancements
1. **Additional Endpoints**
   - `/quote/author/{name}` - quotes by specific author
   - `/quote/category/{category}` - (server-side filtered variant if categories grow large)
   - `/quote/tag/{tag}` - quotes with specific tag (add tags field to data)
2. **Persistence & Admin**
   - Add database (SQLite/Postgres) instead of JSON file
   - Simple admin UI to add/edit quotes
3. **Observability**
   - Basic logging / request metrics
   - Rate limiting for public endpoints
4. **Frontend**
   - Dark/light theme toggle using existing CSS variables
   - Keyboard shortcuts (e.g. press `n` for next quote)
   - Client-side caching of recent quotes

### Usage Examples
```bash
# Get a random quote
curl http://localhost:8080/quote/random

# Search quotes by keyword
curl "http://localhost:8080/quote/search?keyword=life"

# Search quotes by category only
curl "http://localhost:8080/quote/search?category=motivation"

# Search with both filters
curl "http://localhost:8080/quote/search?keyword=success&category=motivation"

# Fetch list of categories
curl http://localhost:8080/catagory
```

---

_This is a learning project focused on understanding Actix Web fundamentals through hands-on API development._
