// Fayl manzili: /api/market.js

export default async function handler(request, response) {
    // 1. Haqiqiy TON narxini olish (CoinGecko API orqali)
    let tonPrice = 5.2; // Agar internet bo'lmasa, shu narx turadi
    
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
        const data = await res.json();
        tonPrice = data['the-open-network'].usd;
    } catch (e) {
        console.log("API xatosi, zaxira narx ishlatilmoqda");
    }

    // 2. Tovarlar ro'yxati (Baza)
    const items = [
        {
            name: "Premium (1 oy)",
            price: "60,000 so'm",
            image: "https://cdn-icons-png.flaticon.com/512/6124/6124997.png",
            status: "active"
        },
        {
            name: "NFT Username @king",
            price: "1000 Stars",
            image: "https://cdn-icons-png.flaticon.com/512/8468/8468303.png",
            status: "sold" // Sotilgan
        },
        {
            name: "Random Gift 🎁",
            price: "50 Stars",
            image: "https://cdn-icons-png.flaticon.com/512/9466/9466266.png",
            status: "active"
        }
    ];

    // 3. Saytga javob qaytarish
    response.status(200).json({
        live_ton_price: tonPrice,
        items: items
    });
}