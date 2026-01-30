// REAL TON MARKETPLACE (HYBRID: +888 API & GIFTS)
export default async function handler(request, response) {
    
    const API_KEY = 'AFNWCHPOYBUCWXYAAAAPXV57JKI2J37AWVGFOVBKE6SJOCO6ZUWA5SJHCX6D4JMHVGAWV3Q'; 
    
    // 1. BU SOVG'ALAR HAR DOIM CHIQADI (Chunki bularni API dan topish qiyin)
    const STATIC_GIFTS = [
        {
            name: "Telegram Premium (Gift)",
            price: "15 TON",
            image: "https://cache.tonapi.io/imgproxy/b272960655615714777995408544778130985583563459978644883460833934.png",
            link: "https://t.me/premium",
            status: "active"
        },
        {
            name: "Red Star Gift",
            price: "50 TON",
            image: "https://cache.tonapi.io/imgproxy/c741914275685829672688402509176378413184346045802107449339316523.png",
            link: "https://getgems.io/collection/EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi",
            status: "active"
        },
        {
            name: "@king (Username)",
            price: "50,000 TON",
            image: "https://nft.fragment.com/username/king.webp",
            link: "https://fragment.com/username/king",
            status: "sold"
        }
    ];

    try {
        // 2. REAL API GA ULANIB, +888 RAQAMLARNI OLAMIZ (Bu aniq ishlaydi)
        const collectionAddress = "EQAOQdwdw8kGftJvGggGwFaC"; // +888 Collection
        
        const nftReq = await fetch(`https://tonapi.io/v2/nfts/collections/${collectionAddress}/items?limit=9&offset=0`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        let realItems = [];
        
        if (nftReq.ok) {
            const nftData = await nftReq.json();
            const itemsList = nftData.nft_items || [];

            realItems = itemsList.map(nft => {
                let imageUrl = "https://ton.org/download/ton_symbol.png";
                if(nft.previews?.length >= 3) imageUrl = nft.previews[2].url;
                else if(nft.previews?.length >= 1) imageUrl = nft.previews[0].url;

                let priceLabel = "Auksionda"; 
                if (nft.sale) {
                    const price = (parseInt(nft.sale.price.value) / 1000000000).toFixed(0);
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
        }

        // 3. SOVG'ALAR VA REAL RAQAMLARNI BIRLASHTIRAMIZ
        // Oldin Gifts chiqadi, keyin esa Real Raqamlar
        const finalItems = [...STATIC_GIFTS, ...realItems];

        return response.status(200).json({
            live_ton_price: 5.6,
            items: finalItems
        });

    } catch (error) {
        // Agar API umuman ishlamasa ham, hech bo'lmasa sovg'alar chiqsin
        console.error(error);
        return response.status(200).json({
            live_ton_price: 5.6,
            items: STATIC_GIFTS
        });
    }
}