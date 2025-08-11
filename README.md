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

Try these improvements to learn more:

1. **Add More Endpoints**
   - `/quote/author/{name}` - quotes by specific author
   - `/quote/category/{category}` - quotes by category
   - `/quote/tag/{tag}` - quotes with specific tag

2. **Frontend Improvements**
   - Search functionality
   - Quote filtering
   - Better styling

---

_This is a learning project focused on understanding Actix Web fundamentals through hands-on API development._
