#![allow(non_snake_case)]
#![allow(unused)]
use actix_files::Files;
use actix_web::http::KeepAlive;
use actix_web::post;
use actix_web::{HttpMessage, HttpResponse, HttpResponseBuilder, web};
use askama::Template;
use rand::{self, seq::IndexedRandom};
use serde::{Deserialize, Serialize};
use std::{io, sync::Arc};

use actix_web::{self, App, HttpServer, Responder, get};

#[derive(Template)]
#[template(path = "home.html")]
pub struct Home;

#[get("/")]
pub async fn home() -> impl Responder {
    let template = Home;
    HttpResponse::Ok()
        .content_type("text/html")
        .body(template.render().unwrap())
}

#[derive(Deserialize, Serialize)]
pub struct Quote {
    Quote: String,
    Author: String,
    Tags: Vec<String>,
    Category: String,
}

type Quotes = Arc<Vec<Quote>>;

#[get("/quote/random")]
pub async fn random(quotes: web::Data<Quotes>) -> impl Responder {
    let mut rng = rand::rng();
    if let Some(quote) = quotes.as_ref().choose(&mut rng) {
        HttpResponse::Ok().json(quote)
    } else {
        HttpResponse::NotFound().body("No quotes found")
    }
}

#[get("/quote/search")]
pub async fn search(quotes: web::Data<Quote>) -> impl Responder {
    HttpResponse::NotFound().body("No quotes found")
}

#[actix_web::main]
async fn main() -> Result<(), std::io::Error> {
    let data = std::fs::read_to_string("data/quotes.json").expect("failed to read the quotes file");
    let quotes: Vec<Quote> = serde_json::from_str(&data).expect("failed to parse quote json");
    let shared_quotes = Arc::new(quotes);
    HttpServer::new(move || {
        App::new()
            .service(random)
            .service(home)
            .app_data(web::Data::new(shared_quotes.clone()))
            .service(Files::new("/static", "./static").show_files_listing())
    })
    .keep_alive(KeepAlive::Os)
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
