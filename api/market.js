// REAL TON MARKETPLACE (TONAPI KEY BILAN)
export default async function handler(request, response) {
    
    // SIZNING XUSUSIY KALITINGIZ:
    const API_KEY = 'AFNWCHPOYBUCWXYAAAAPXV57JKI2J37AWVGFOVBKE6SJOCO6ZUWA5SJHCX6D4JMHVGAWV3Q'; 

    try {
        // 1. TON Narxini olish (Dollarda)
        let tonPrice = 5.6;
        try {
            const priceReq = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
            const priceData = await priceReq.json();
            tonPrice = priceData['the-open-network'].usd;
        } catch (e) {
            console.log("CoinGecko xatosi, zaxira narx ishlatildi");
        }

        // 2. HAQIQIY BLOKCHEYNDAN MA'LUMOT OLISH
        // Biz "Telegram Usernames" kolleksiyasidan ma'lumot olamiz
        const collectionAddress = "EQCA14eepp1l180adKpPPBR65I1ge3sc8Y8hA4k_878C0000"; 
        
        // TonAPI ga kalit bilan so'rov yuborish
        const nftReq = await fetch(`https://tonapi.io/v2/nfts/collections/${collectionAddress}/items?limit=12&offset=0`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}` // <--- KALIT SHU YERDA ISHLATILADI
            }
        });

        if (!nftReq.ok) {
            throw new Error(`API Xatosi: ${nftReq.status}`);
        }

        const nftData = await nftReq.json();

        // 3. MA'LUMOTLARNI CHIROYLI QILISH
        const realItems = nftData.nft_items.map(nft => {
            // Rasmni aniqlash (yuqori sifatlisini olish)
            let imageUrl = "https://ton.org/download/ton_symbol.png";
            if(nft.previews && nft.previews.length >= 2) {
                imageUrl = nft.previews[1].url;
            } else if (nft.previews && nft.previews.length === 1) {
                imageUrl = nft.previews[0].url;
            }

            // Narxni va Statusni aniqlash
            let priceLabel = "Auksionda"; 
            let status = "sold"; // Agar sotuvda bo'lmasa, "sotilgan" deymiz
            
            // Agar NFT sotuvga qo'yilgan bo'lsa (Getgems da)
            if (nft.sale) {
                // Narx NanoTON da keladi (1 TON = 1,000,000,000 NanoTON)
                const price = (parseInt(nft.sale.price.value) / 1000000000).toFixed(0);
                priceLabel = `${price} TON`;
                status = "active"; // Aktiv holatga o'tkazamiz
            }

            return {
                name: nft.metadata.name || "Nomsiz NFT",
                image: imageUrl,
                price: priceLabel,
                status: status,
                address: nft.address,
                link: `https://getgems.io/collection/${collectionAddress}/${nft.address}`
            };
        });

        // Muvaffaqiyatli javob
        response.status(200).json({
            live_ton_price: tonPrice,
            items: realItems
        });

    } catch (error) {
        console.error("SERVER XATOSI:", error);
        // Agar xato bo'lsa, foydalanuvchiga bildiramiz
        response.status(500).json