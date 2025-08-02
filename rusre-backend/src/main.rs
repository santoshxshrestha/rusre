use actix_web::{self, HttpResponse, HttpServer, post};
use actix_web::{App, Responder};
use actix_web::{get, web};
use serde::Serialize;

#[derive(Serialize)]
pub struct ReturnData {
    name: String,
    message: String,
}

#[get("/")]
pub async fn hello() -> impl Responder {
    HttpResponse::Ok().body("hello santosh")
}
#[post("/api/json")]
pub async fn json_response() -> impl Responder {
    let data = ReturnData {
        name: "Santosh".to_string(),
        message: "Hello there what is going on".to_string(),
    };
    web::Json(data)
}

#[actix_web::main]
async fn main() -> Result<(), std::io::Error> {
    HttpServer::new(|| App::new().service(hello).service(json_response))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
