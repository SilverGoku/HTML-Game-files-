// Ekran boyutları
const ekran_genislik = 800;
const ekran_yukseklik = 600;

// Renkler
const black = "#000000";
const beyaz = "#FFFFFF";
const red = "#FF0000";

// Karakter özellikleri
let karakter_genislik = 50;
let karakter_yukseklik = 50;
let karakter_x = (ekran_genislik - karakter_genislik) / 2;
let karakter_y = ekran_yukseklik - karakter_yukseklik;

// Engellerin özellikleri
let engel_genislik = 50;
let engel_yukseklik = 20;
let engel_x = Math.floor(Math.random() * (ekran_genislik - engel_genislik));
let engel_y = 0;
let engel_hizi = 2;

// Canvas elementini alın
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Oyun döngüsü
let calisma = true;
function oyunDongusu() {
    if (!calisma) {
        return;
    }

    requestAnimationFrame(oyunDongusu);

    // Klavye kontrolleri
    const tuslar = {};
    window.addEventListener("keydown", (e) => {
        tuslar[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
        tuslar[e.key] = false;
    });
    karakter_x += (tuslar["ArrowRight"] - tuslar["ArrowLeft"]) * 2.5;

    // Engeli aş
    engel_y += engel_hizi;
    if (engel_y > ekran_yukseklik) {
        engel_x = Math.floor(Math.random() * (ekran_genislik - engel_genislik));
        engel_y = 0;
    }

    // Çarpışma kontrolü
    if (
        karakter_x < engel_x + engel_genislik &&
        karakter_x + karakter_genislik > engel_x &&
        karakter_y < engel_y + engel_yukseklik &&
        karakter_y + karakter_yukseklik > engel_y
    ) {
        calisma = false;
    }

    // Canvas'ı temizle
    context.fillStyle = black;
    context.fillRect(0, 0, ekran_genislik, ekran_yukseklik);

    // Karakteri çiz
    context.fillStyle = red;
    context.fillRect(karakter_x, karakter_y, karakter_genislik, karakter_yukseklik);

    // Engeli çiz
    context.fillStyle = beyaz;
    context.fillRect(engel_x, engel_y, engel_genislik, engel_yukseklik);
}

// Oyun döngüsünü başlat
oyunDongusu();

// Oyun döngüsü sonlandığında oyunu durdur
function oyunuDurdur() {
    calisma = false;
}

// Oyun döngüsü sonlandığında Pygame'i kapat
function oyunuKapat() {
    oyunuDurdur();
    // Gerekirse, ek kaynakları temizleyebilirsiniz.
}

// Oyunu başlat
function oyunuBaslat() {
    calisma = true;
    karakter_x = (ekran_genislik - karakter_genislik) / 2;
    karakter_y = ekran_yukseklik - karakter_yukseklik;
    engel_x = Math.floor(Math.random() * (ekran_genislik - engel_genislik));
    engel_y = 0;
    oyunDongusu();
}
