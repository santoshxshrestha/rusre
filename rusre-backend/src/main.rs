use actix_cors::Cors;
use actix_web::{App, HttpResponse, HttpServer, Responder, Result, middleware::Logger, web};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Quote {
    id: u32,
    text: String,
    author: String,
}

fn get_quotes() -> Vec<Quote> {
    vec![
        Quote {
            id: 1,
            text: "The only way to do great work is to love what you do.".to_string(),
            author: "Steve Jobs".to_string(),
        },
        Quote {
            id: 2,
            text: "Life is what happens to you while you're busy making other plans.".to_string(),
            author: "John Lennon".to_string(),
        },
        Quote {
            id: 3,
            text: "The future belongs to those who believe in the beauty of their dreams."
                .to_string(),
            author: "Eleanor Roosevelt".to_string(),
        },
        Quote {
            id: 4,
            text: "It is during our darkest moments that we must focus to see the light."
                .to_string(),
            author: "Aristotle".to_string(),
        },
        Quote {
            id: 5,
            text: "In the middle of difficulty lies opportunity.".to_string(),
            author: "Albert Einstein".to_string(),
        },
    ]
}

async fn get_all_quotes() -> Result<impl Responder> {
    Ok(HttpResponse::Ok().json(get_quotes()))
}

async fn get_random_quote() -> Result<impl Responder> {
    let quotes = get_quotes();
    let random_index = fastrand::usize(..quotes.len());
    Ok(HttpResponse::Ok().json(&quotes[random_index]))
}

async fn get_quote_by_id(path: web::Path<u32>) -> Result<impl Responder> {
    let quote_id = path.into_inner();
    let quotes = get_quotes();

    match quotes.iter().find(|q| q.id == quote_id) {
        Some(quote) => Ok(HttpResponse::Ok().json(quote)),
        None => Ok(HttpResponse::NotFound().json(serde_json::json!({
            "error": "Quote not found"
        }))),
    }
}

async fn health() -> Result<impl Responder> {
    Ok(HttpResponse::Ok().json(serde_json::json!({
        "status": "ok",
        "message": "Quotes API is running!"
    })))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    println!(" Quotes API starting on http://localhost:8080");
    println!(" Endpoints:");
    println!("   GET /health");
    println!("   GET /api/quotes");
    println!("   GET /api/quotes/random");
    println!("   GET /api/quotes/{{id}}");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000") // React
            .allowed_origin("http://localhost:5173") // Vite
            .allowed_methods(vec!["GET"])
            .allowed_headers(vec!["Content-Type"]);

        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .route("/health", web::get().to(health))
            .service(
                web::scope("/api")
                    .route("/quotes", web::get().to(get_all_quotes))
                    .route("/quotes/random", web::get().to(get_random_quote))
                    .route("/quotes/{id}", web::get().to(get_quote_by_id)),
            )
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
