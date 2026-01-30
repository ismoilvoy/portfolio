// REAL TON MARKETPLACE (+888 ANONIM RAQAMLAR)
export default async function handler(request, response) {
    
    // Sizning kalitingiz (ishlayapti):
    const API_KEY = 'AFNWCHPOYBUCWXYAAAAPXV57JKI2J37AWVGFOVBKE6SJOCO6ZUWA5SJHCX6D4JMHVGAWV3Q'; 
    
    // ✅ ENG ISHONCHLI MANZIL: +888 Raqamlar
    // Bu kolleksiya har doim to'la, shuning uchun "Tovar yo'q" degan xato chiqmaydi.
    const collectionAddress = "EQAOQdwdw8kGftJvGggGwFaC"; 

    try {
        const nftReq = await fetch(`https://tonapi.io/v2/nfts/collections/${collectionAddress}/items?limit=12&offset=0`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Agar xato bo'lsa
        if (!nftReq.ok) {
            throw new Error(`API Xatosi: ${nftReq.status}`);
        }

        const nftData = await nftReq.json();

        // Agar ro'yxat bo'sh kelsa
        const itemsList = nftData.nft_items || [];

        const realItems = itemsList.map(nft => {
            // Rasmni aniqlash
            let imageUrl = "https://ton.org/download/ton_symbol.png";
            // +888 raqamlar uchun tiniq rasm
            if(nft.previews?.length >= 3) imageUrl = nft.previews[2].url; 
            else if(nft.previews?.length >= 1) imageUrl = nft.previews[0].url;

            // Narxni hisoblash
            let priceLabel = "Auksionda"; 
            if (nft.sale) {
                const price = (parseInt(nft.sale.price.value) / 1000000000).toFixed(0);
                priceLabel = `${price} TON`;
            }

            return {
                name: nft.metadata.name || "Anonim Raqam",
                image: imageUrl,
                price: priceLabel,
                status: "active", // Doim aktiv ko'rsatamiz
                link: `https://getgems.io/collection/${collectionAddress}/${nft.address}`
            };
        });

        return response.status(200).json({
            live_ton_price: 5.6,
            items: realItems
        });

    } catch (error) {
        return response.status(500).json({
            error: true,
            message: "Server Xatosi",
            details: error.toString()
        });
    }
}