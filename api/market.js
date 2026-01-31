// Narxlar (O'zgaruvchan)
const prices = {
    star: 250,
    memberAralash: 15, // 1 ta odam uchun
    memberToza: 45     // 1 ta odam uchun
};

const categories = [
    { id: 'tg_market', name: 'Telegram Market', icon: 'fab fa-telegram', color: '#0088cc' },
    { id: 'ai_market', name: 'AI Market', icon: 'fas fa-robot', color: '#bd00ff' },
    { id: 'web_market', name: 'Website Xizmatlari', icon: 'fas fa-code', color: '#00f2ff' }
];

function openMarket() {
    tab('market');
    renderCategories();
}

function renderCategories() {
    const container = document.getElementById('market-content');
    document.getElementById('market-title').innerText = "Kategoriyalar";
    container.innerHTML = categories.map(cat => `
        <div class="card" onclick="openCategory('${cat.id}')" style="cursor:pointer; border-bottom: 3px solid ${cat.color}; transition: 0.3s;">
            <i class="${cat.icon}" style="font-size: 45px; color: ${cat.color}; margin-bottom: 15px;"></i>
            <h3>${cat.name}</h3>
            <p style="font-size:12px; color:gray; margin-top:10px;">Xizmatlar ro'yxatini ko'rish</p>
        </div>
    `).join('');
}

function openCategory(id) {
    const container = document.getElementById('market-content');
    const title = document.getElementById('market-title');
    title.innerHTML = `<button onclick="renderCategories()" class="btn" style="width:auto; padding:5px 15px; margin-right:15px;">⬅️</button> ${id.replace('_', ' ').toUpperCase()}`;

    if(id === 'tg_market') {
        container.innerHTML = `
            <div class="card" style="grid-column: 1 / -1; border: 1px solid #ffcc00; background: rgba(255, 204, 0, 0.05);">
                <h3><i class="fas fa-star" style="color:#ffcc00"></i> Yulduzcha (Stars) Kalkulyatori</h3>
                <input type="number" id="starsQty" placeholder="Miqdorni kiriting..." oninput="calc('stars')" 
                       style="width:100%; padding:12px; margin-top:15px; background:#1a1a2e; border:1px solid #333; color:white; border-radius:8px;">
                <div id="starsRes" style="margin-top:10px; font-size:22px; color:#ffcc00; font-weight:bold;">0 so'm</div>
            </div>

            <div class="card"><h3>3 Oy Premium</h3><button class="btn">Tanlash</button></div>
            <div class="card"><h3>6 Oy Premium</h3><button class="btn">Tanlash</button></div>
            <div class="card"><h3>12 Oy Premium</h3><button class="btn">Tanlash</button></div>

            <div class="card" style="grid-column: 1 / -1;">
                <h3><i class="fas fa-users"></i> Odam qo'shish (Aralash/Toza)</h3>
                <input type="number" id="memQty" placeholder="Soni..." oninput="calc('members')" style="width:100%; padding:10px; margin:10px 0; background:#1a1a2e; border:1px solid #333; color:white;">
                <div id="memRes" style="font-size:18px; color:#00f2ff;">Jami: 0 so'm</div>
            </div>
        `;
    } else if(id === 'ai_market') {
        container.innerHTML = `
            <div class="card"><h3>ChatGPT Plus</h3><button class="btn">Obuna bo'lish</button></div>
            <div class="card"><h3>Midjourney</h3><button class="btn">Obuna bo'lish</button></div>
        `;
    } else {
        container.innerHTML = `
            <div class="card"><h3>Portfolio yaratish</h3><button class="btn">Buyurtma berish</button></div>
            <div class="card"><h3>Telegram WebApp</h3><button class="btn">Buyurtma berish</button></div>
        `;
    }
}

function calc(type) {
    if(type === 'stars') {
        const q = document.getElementById('starsQty').value;
        document.getElementById('starsRes').innerText = (q * prices.star).toLocaleString() + " so'm";
    }
    if(type === 'members') {
        const q = document.getElementById('memQty').value;
        document.getElementById('memRes').innerText = "Jami: " + (q * prices.memberToza).toLocaleString() + " so'm";
    }
}