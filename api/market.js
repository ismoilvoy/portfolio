// api/market.js - DEBUG REJIMI
export default async function handler(request, response) {
    
    // Siz bergan kalit:
    const API_KEY = 'AFNWCHPOYBUCWXYAAAAPXV57JKI2J37AWVGFOVBKE6SJOCO6ZUWA5SJHCX6D4JMHVGAWV3Q'; 
    
    // Telegram Usernames kolleksiyasi
    const collectionAddress = "EQCA14eepp1l180adKpPPBR65I1ge3sc8Y8hA4k_878C0000"; 

    try {
        console.log("TonAPI ga so'rov yuborilmoqda...");

        // 1. NFTlarni so'rash
        const nftReq = await fetch(`https://tonapi.io/v2/nfts/collections/${collectionAddress}/items?limit=6&offset=0`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // 2. Agar TonAPI xato qaytarsa, o'sha xatoni ushlaymiz
        if (!nftReq.ok) {
            const errorText = await nftReq.text(); // Xato matnini o'qish
            console.error("TonAPI Xatosi:", errorText);
            
            // Saytga xatoni yuborish
            return response.status(nftReq.status).json({
                error: true,
                message: `TonAPI Xatosi: ${nftReq.status}`,
                details: errorText
            });
        }

        const nftData = await nftReq.json();

        // 3. Agar ma'lumot bo'sh bo'lsa
        if (!nftData.nft_items || nftData.nft_items.length === 0) {
            return response.status(200).json({
                error: true,
                message: "TonAPI ishladi, lekin tovar topilmadi."
            });
        }

        // 4. Ma'lumotlarni tayyorlash
        const realItems = nftData.nft_items.map(nft => {
            let imageUrl = "https://ton.org/download/ton_symbol.png";
            if(nft.previews?.length >= 2) imageUrl = nft.previews[1].url;

            let priceLabel = "Sotuvda yo'q"; 
            let status = "active"; // "sold" deb yozmaymiz, chunki bular mavjud NFTlar
            
            if (nft.sale) {
                const price = (parseInt(nft.sale.price.value) / 1000000000).toFixed(2);
                priceLabel = `${price} TON`;
            }

            return {
                name: nft.metadata.name || "Nomsiz",
                image: imageUrl,
                price: priceLabel,
                status: status,
                link: `https://getgems.io/collection/${collectionAddress}/${nft.address}`
            };
        });

        // Muvaffaqiyatli javob
        return response.status(200).json({
            live_ton_price: 5.6, // Vaqtincha statik
            items: realItems
        });

    } catch (error) {
        console.error("Server ichki xatosi:", error);
        return response.status(500).json({
            error: true,
            message: "Server Xatosi (Internal Error)",
            details: error.toString()
        });
    }
}