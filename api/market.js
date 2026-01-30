export default async function handler(request, response) {
    // 1. TON narxini olish (Zaxira narxi bilan)
    let tonPrice = 5.4; 
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
        const data = await res.json();
        tonPrice = data['the-open-network'].usd;
    } catch (e) {
        console.log("API xatosi, zaxira narx ishlatilmoqda");
    }

    // 2. KATTA DO'KON BAZASI
    const items = [
        {
            id: 1,
            name: "Telegram Premium (1 Oy)",
            price: "60,000 so'm",
            image: "https://play-lh.googleusercontent.com/idz118qGvI88_w0F5W5WJ_9b42qXOXFqX2e7S4s4h5z_Z2W4k_Z2W4k_Z2W4k_Z2W4k=w240-h480-rw",
            status: "active"
        },
        {
            id: 2,
            name: "Telegram Premium (1 Yil)",
            price: "360,000 so'm",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png",
            status: "active"
        },
        {
            id: 3,
            name: "500 Telegram Stars",
            price: "125,000 so'm",
            image: "https://telegram.org/file/464001154/1/bIm_8_Kq_yY.286407/6c07525790479f6975",
            status: "active"
        },
        {
            id: 4,
            name: "NFT Username @king",
            price: "10,000 TON",
            image: "https://xim.uz/uploads/posts/2023-03/1679044416_username.jpg",
            status: "sold"
        },
        {
            id: 5,
            name: "Model Gift (Limited)",
            price: "15,000 Stars",
            image: "https://nft.fragment.com/number/88888888888.webp",
            status: "active"
        },
        {
            id: 6,
            name: "AI Video (1 daqiqa)",
            price: "50,000 so'm",
            image: "https://img.freepik.com/premium-photo/robot-face-with-large-eyes-that-says-ai-it_900706-7994.jpg",
            status: "active"
        },
        {
            id: 7,
            name: "USA Raqam (+1)",
            price: "25,000 so'm",
            image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png",
            status: "active"
        }
    ];

    response.status(200).json({
        live_ton_price: tonPrice,
        items: items
    });
}