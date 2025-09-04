const rulesData = {
    "general": {
      "title": "نحن نبحث عن الجودة التي تليق باللاعب وصانع المحتوى ، نحن نعمل منذ عام 2019 ولدينا الخبرة الادارية والبرمجية، ايضاً نهدف الى البحث على تطوير جودة اللعب ، يوجد لدينا دعم فني على مدار 24/7 ونسعى دوماً لخدمتكم.",
    },
  };


  const cursor = document.querySelector('.custom-cursor');
  let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function animateCursor() {
    posX += (mouseX - posX) * 0.10;
    posY += (mouseY - posY) * 0.10;
    cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  function showLoadingScreen(targetUrl) {
    const loadingScreen = document.getElementById('loadingScreen');
    const directions = ['loading-slide-in-top', 'loading-slide-in-bottom', 'loading-slide-in-left', 'loading-slide-in-right'];
    const randomDir = directions[Math.floor(Math.random() * directions.length)];
    loadingScreen.className = '';
    loadingScreen.style.display = 'block';
    loadingScreen.classList.add(randomDir);
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 1500);
  }
  document.getElementById('mainBtn').addEventListener('click', function(e) {
    e.preventDefault();
    const targetUrl = this.getAttribute('href');
    showLoadingScreen(targetUrl);
  });


  document.addEventListener('DOMContentLoaded', function() {
    const rulesGrid = document.getElementById('rulesGrid');
    const categoryIcons = {
      general: '<i class="fas fa-gavel"></i>',
      safe: '<i class="fas fa-shield-alt"></i>',
      crime: '<i class="fas fa-exclamation-triangle"></i>',
      robbery: '<i class="fas fa-money-bill-wave"></i>',
      store: '<i class="fas fa-shopping-cart"></i>'
    };
    for (const category in rulesData) {
      const categoryData = rulesData[category];
      const ruleCard = document.createElement('div');
      ruleCard.classList.add('rule-card');
      ruleCard.style.animationDelay = `${Math.random() * 0.5}s`;
      const ruleHeader = document.createElement('div');
      ruleHeader.classList.add('rule-header');
      const ruleIcon = document.createElement('div');
      ruleIcon.classList.add('rule-icon');
      ruleIcon.innerHTML = categoryIcons[category] || '<i class="fas fa-gavel"></i>';
      const ruleTitle = document.createElement('div');
      ruleTitle.classList.add('rule-title');
      ruleTitle.textContent = categoryData.title;
      ruleHeader.appendChild(ruleIcon);
      ruleHeader.appendChild(ruleTitle);
      const ruleDescription = document.createElement('div');
      ruleDescription.classList.add('rule-description');
      ruleDescription.textContent = categoryData.description;
      ruleCard.appendChild(ruleHeader);
      ruleCard.appendChild(ruleDescription);
      ruleCard.addEventListener('click', () => {
        openModal(categoryData);
      });
      rulesGrid.appendChild(ruleCard);
    }
  });

  function openModal(categoryData) {
    const modal = document.getElementById('rulesModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalRules = document.getElementById('modalRules');
    modalTitle.textContent = categoryData.title;
    modalRules.innerHTML = '';
    categoryData.rules.forEach(rule => {
      const ruleItem = document.createElement('div');
      ruleItem.classList.add('modal-rule-item');
      const ruleIcon = document.createElement('div');
      ruleIcon.classList.add('modal-rule-icon');
      ruleIcon.innerHTML = '<i class="fas fa-check"></i>';
      const ruleText = document.createElement('div');
      ruleText.classList.add('modal-rule-text');
      ruleText.textContent = rule.text;
      ruleItem.appendChild(ruleIcon);
      ruleItem.appendChild(ruleText);
      modalRules.appendChild(ruleItem);
    });
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('rulesModal').style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  window.addEventListener('click', (e) => {
    if (e.target.id === 'rulesModal') {
      document.getElementById('rulesModal').style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });