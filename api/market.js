// Narxlar sozlamalari
const starPrice = 250; 
const prices = {
    premium3: "150,000",
    premium6: "280,000",
    premium12: "500,000",
    memberToza: 45
};

const categories = [
    { id: 'tg_market', name: 'Telegram Market', icon: 'fab fa-telegram', color: '#0088cc', desc: 'Premium, Stars, Members' },
    { id: 'ai_market', name: 'AI Market', icon: 'fas fa-robot', color: '#bd00ff', desc: 'ChatGPT, Midjourney' },
    { id: 'web_market', name: 'Website Xizmatlari', icon: 'fas fa-code', color: '#00f2ff', desc: 'Portfolio, Botlar' }
];

function openMarket() {
    tab('market');
    renderCategories();
}

function renderCategories() {
    const container = document.getElementById('market-content');
    document.getElementById('market-title').innerText = "Kategoriyalar";
    container.innerHTML = categories.map(cat => `
        <div class="card" onclick="openCategory('${cat.id}')" style="cursor:pointer; border-bottom: 3px solid ${cat.color}">
            <i class="${cat.icon}" style="font-size: 40px; color: ${cat.color}"></i>
            <h3 style="margin-top:15px">${cat.name}</h3>
            <p style="font-size:13px; color:gray; margin-top:10px">${cat.desc}</p>
        </div>
    `).join('');
}

function openCategory(id) {
    const container = document.getElementById('market-content');
    const title = document.getElementById('market-title');
    
    if(id === 'tg_market') {
        title.innerHTML = `<button onclick="renderCategories()" class="btn" style="width:auto; margin-right:15px; padding:5px 15px;">⬅️</button> Telegram Market`;
        container.innerHTML = `
            <div class="card" style="grid-column: 1 / -1; border: 1px solid #ffcc00; background: rgba(255,204,0,0.05);">
                <h3><i class="fas fa-star" style="color:#ffcc00"></i> Stars Kalkulyatori</h3>
                <p style="font-size:13px; color:gray; margin-top:5px;">Ixtiyoriy miqdorni kiriting:</p>
                <input type="number" id="starsQty" placeholder="Masalan: 50" oninput="calcStars()" 
                       style="font-size:18px; border-color: rgba(255,204,0,0.3);">
                <div id="starsRes" style="margin-top:15px; font-size:24px; color:#ffcc00; font-weight:bold;">0 so'm</div>
            </div>

            <div class="card">
                <i class="fas fa-gem" style="color:#0088cc"></i>
                <h3>3 Oy Premium</h3>
                <p style="color:var(--neon-blue); font-weight:bold; margin-top:10px;">${prices.premium3} so'm</p>
                <button class="btn">Tanlash</button>
            </div>
            <div class="card">
                <i class="fas fa-gem" style="color:#0088cc"></i>
                <h3>6 Oy Premium</h3>
                <p style="color:var(--neon-blue); font-weight:bold; margin-top:10px;">${prices.premium6} so'm</p>
                <button class="btn">Tanlash</button>
            </div>
            
            <div class="card" style="grid-column: 1 / -1;">
                <h3><i class="fas fa-users" style="color:var(--neon-purple)"></i> Odam qo'shish (Toza)</h3>
                <input type="number" id="memQty" placeholder="Soni..." oninput="calcMembers()" style="margin-top:15px;">
                <div id="memRes" style="margin-top:10px; font-size:20px; color:var(--neon-purple); font-weight:bold;">Jami: 0 so'm</div>
                <button class="btn">Buyurtma berish</button>
            </div>
        `;
    } else {
        container.innerHTML = `<div class="card"><h3>Tez kunda...</h3><p>Ushbu bo'lim ustida ish olib borilmoqda.</p><button class="btn" onclick="renderCategories()">Orqaga</button></div>`;
    }
}

function calcStars() {
    const q = document.getElementById('starsQty').value;
    const res = document.getElementById('starsRes');
    res.innerText = q > 0 ? (q * starPrice).toLocaleString() + " so'm" : "0 so'm";
}

function calcMembers() {
    const q = document.getElementById('memQty').value;
    const res = document.getElementById('memRes');
    res.innerText = q > 0 ? "Jami: " + (q * prices.memberToza).toLocaleString() + " so'm" : "Jami: 0 so'm";
}