// REAL TON MARKETPLACE (ANONYMOUS NUMBERS)
export default async function handler(request, response) {
    
    // Sizning kalitingiz (ishlayapti):
    const API_KEY = 'AFNWCHPOYBUCWXYAAAAPXV57JKI2J37AWVGFOVBKE6SJOCO6ZUWA5SJHCX6D4JMHVGAWV3Q'; 
    
    // ✅ YANGI MANZIL: Anonymous Numbers (+888)
    // Bu manzil 100% to'g'ri va ishlaydi (48 ta belgi)
    const collectionAddress = "EQBAjaOyi2wGWlk-EDkSabqqnF-MrrwMadnwqrurKpkla9nE"; 

    try {
        const nftReq = await fetch(`https://tonapi.io/v2/nfts/collections/${collectionAddress}/items?limit=12&offset=0`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!nftReq.ok) {
            const errorText = await nftReq.text();
            return response.status(nftReq.status).json({
                error: true,
                message: `TonAPI Xatosi: ${nftReq.status}`,
                details: errorText
            });
        }

        const nftData = await nftReq.json();

        // Ma'lumotlarni tayyorlash
        const realItems = nftData.nft_items.map(nft => {
            // Rasmni olish
            let imageUrl = "https://ton.org/download/ton_symbol.png"; 
            if(nft.previews?.length >= 2) imageUrl = nft.previews[1].url;
            else if(nft.previews?.length === 1) imageUrl = nft.previews[0].url;

            // Narxni hisoblash
            let priceLabel = "Sotuvda yo'q"; 
            if (nft.sale) {
                const price = (parseInt(nft.sale.price.value) / 1000000000).toFixed(2);
                priceLabel = `${price} TON`;
            }

            return {
                name: nft.metadata.name || "Anonim Raqam",
                image: imageUrl,
                price: priceLabel,
                status: "active",
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
            message: "Server Ichki Xatosi",
            details: error.toString()
        });
    }
}