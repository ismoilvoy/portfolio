export default async function handler(request, response) {
    const API_KEY = 'AFNWCHPOYBUCWXYAAAAPXV57JKI2J37AWVGFOVBKE6SJOCO6ZUWA5SJHCX6D4JMHVGAWV3Q'; 
    
    // Telegram Usernames kolleksiyasi
    const collectionAddress = "EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi"; 

    try {
        const nftReq = await fetch(`https://tonapi.io/v2/nfts/collections/${collectionAddress}/items?limit=12&offset=0`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });

        if (!nftReq.ok) throw new Error("API ulanishda xato");

        const nftData = await nftReq.json();
        const itemsList = nftData.nft_items || [];

        const realItems = itemsList.map(nft => {
            const name = nft.metadata.name || "Username";
            const cleanName = name.replace('@', ''); // Fragment uchun @ belgisini olib tashlaymiz

            // 📸 SIFATLI RASM STRATEGIYASI:
            // Birinchi navbatda Fragment serveridan HD rasm olishga harakat qilamiz
            let highResImage = `https://nft.fragment.com/username/${cleanName}.webp`;
            
            // Agar Fragment rasmi bo'lmasa, GetGems dan eng sifatli previewni olamiz
            if (!nft.metadata.name) {
                highResImage = nft.previews?.find(p => p.resolution === '500x500')?.url || nft.previews?.[nft.previews.length - 1]?.url;
            }

            let priceLabel = "Sotuvda yo'q"; 
            if (nft.sale) {
                priceLabel = `${(parseInt(nft.sale.price.value) / 1000000000).toFixed(1)} TON`;
            }

            return {
                name: name,
                image: highResImage,
                price: priceLabel,
                link: `https://fragment.com/username/${cleanName}`
            };
        });

        return response.status(200).json({ items: realItems });

    } catch (error) {
        return response.status(500).json({ error: true, details: error.message });
    }
}