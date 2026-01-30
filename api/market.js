// api/market.js - TUZATILGAN VERSIYA
export default async function handler(request, response) {
    
    // Sizning kalitingiz:
    const API_KEY = 'AFNWCHPOYBUCWXYAAAAPXV57JKI2J37AWVGFOVBKE6SJOCO6ZUWA5SJHCX6D4JMHVGAWV3Q'; 
    
    // --- TUZATILGAN MANZIL (Telegram Usernames) ---
    // Oxiridagi ortiqcha 0000 larni olib tashladik:
    const collectionAddress = "EQCA14eepp1l180adKpPPBR65I1ge3sc8Y8hA4k_878C"; 

    try {
        // 1. NFTlarni so'rash
        const nftReq = await fetch(`https://tonapi.io/v2/nfts/collections/${collectionAddress}/items?limit=12&offset=0`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!nftReq.ok) {
            const errorText = await nftReq.text();
            console.error("TonAPI Xatosi:", errorText);
            
            return response.status(nftReq.status).json({
                error: true,
                message: `TonAPI Xatosi: ${nftReq.status}`,
                details: errorText
            });
        }

        const nftData = await nftReq.json();

        // 2. Ma'lumotlarni tayyorlash
        const realItems = nftData.nft_items.map(nft => {
            let imageUrl = "https://ton.org/download/ton_symbol.png";
            if(nft.previews?.length >= 2) imageUrl = nft.previews[1].url;
            else if(nft.previews?.length === 1) imageUrl = nft.previews[0].url;

            let priceLabel = "Sotuvda yo'q"; 
            let status = "active";
            
            if (nft.sale) {
                const price = (parseInt(nft.sale.price.value) / 1000000000).toFixed(2);
                priceLabel = `${price} TON`;
            }

            return {
                name: nft.metadata.name || "Nomsiz",
                image: imageUrl,
                price: priceLabel,
                status: status,
                address: nft.address,
                link: `https://getgems.io/collection/${collectionAddress}/${nft.address}`
            };
        });

        // Muvaffaqiyatli javob
        return response.status(200).json({
            live_ton_price: 5.6,
            items: realItems
        });

    } catch (error) {
        console.error("Server xatosi:", error);
        return response.status(500).json({
            error: true,
            message: "Server ichki xatosi",
            details: error.toString()
        });
    }
}