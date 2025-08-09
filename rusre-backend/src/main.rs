use actix_web::{self, HttpResponse, HttpServer, post};
use actix_web::{App, Responder};
use actix_web::{get, web};
use rand::prelude::IndexedRandom;
use serde::Deserialize;
use serde::Serialize;
use std::fs;
use std::sync::Arc;

#[derive(Deserialize, Serialize)]
pub struct Quote {
    id: usize,
    text: String,
    author: String,
    categories: Vec<String>,
}

type Quotes = Arc<Vec<Quote>>;

#[post("/api/random")]
pub async fn random(quotes: web::Data<Quotes>) -> impl Responder {
    let mut rng = rand::rng();
    if let Some(quote) = quotes.as_ref().choose(&mut rng) {
        HttpResponse::Ok().json(quote)
    } else {
        HttpResponse::NotFound().body("No quotes found")
    }
}

#[get("/")]
pub async fn hello() -> impl Responder {
    HttpResponse::Ok().body("hello santosh")
}

#[actix_web::main]
async fn main() -> Result<(), std::io::Error> {
    let data = fs::read_to_string("data/quotes.json").expect("failed to read the quotes file");
    let quotes: Vec<Quote> = serde_json::from_str(&data).expect("failed to parse quote json");
    let shared_quotes = Arc::new(quotes);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(shared_quotes.clone()))
            .service(random)
            .service(hello)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
