// REAL TON MARKETPLACE API
export default async function handler(request, response) {
    try {
        // 1. HAQIQIY TON NARXINI OLISH
        let tonPrice = 5.5;
        try {
            const priceReq = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
            const priceData = await priceReq.json();
            tonPrice = priceData['the-open-network'].usd;
        } catch (e) {
            console.log("CoinGecko ishlamadi");
        }

        // 2. HAQIQIY BLOKCHEYNDAN MA'LUMOT OLISH (TonAPI)
        // Biz bu yerda "Telegram Usernames" kolleksiyasidan haqiqiy NFTlarni tortib olamiz
        // Collection Address: Telegram Usernames
        const collectionAddress = "EQCA14eepp1l180adKpPPBR65I1ge3sc8Y8hA4k_878C0000"; 
        
        // TonAPI ga so'rov yuborish (Limit: 8 ta tovar)
        const nftReq = await fetch(`https://tonapi.io/v2/nfts/collections/${collectionAddress}/items?limit=8&offset=0`);
        const nftData = await nftReq.json();

        // 3. BLOKCHEYN MA'LUMOTLARINI SAYTGA MOSLASH
        const realItems = nftData.nft_items.map(nft => {
            // Agar NFT sotuvda bo'lmasa, unga taxminiy narx qo'yamiz (chunki bu shunchaki ko'rish uchun)
            // Haqiqiy marketda "sale" obyekti bo'ladi.
            let priceTon = Math.floor(Math.random() * 500) + 10; // Hozircha namuna uchun
            
            // Rasmni to'g'irlash
            let imageUrl = nft.previews && nft.previews.length > 1 ? nft.previews[1].url : "https://ton.org/download/ton_symbol.png";

            return {
                name: nft.metadata.name || "Nomsiz NFT",
                image: imageUrl,
                price: `${priceTon} TON`,
                status: "active", // Blokcheynda bor
                address: nft.address, // NFT manzili
                link: `https://getgems.io/collection/${collectionAddress}/${nft.address}` // Getgemsga link
            };
        });

        // Javob qaytarish
        response.status(200).json({
            live_ton_price: tonPrice,
            items: realItems
        });

    } catch (error) {
        console.error("Server Xatosi:", error);
        // Agar TonAPI ishlamasa (limit tugasa), zaxira ma'lumot beramiz
        response.status(200).json({
            live_ton_price: 5.5,
            items: [
                { name: "Server Band", price: "---", image: "", status: "sold" }
            ]
        });
    }
}