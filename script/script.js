document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Xóa active cũ
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.project-panel').forEach(panel => panel.classList.remove('active'));

        // Gán active mới
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});


// projet
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.project-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    const loadProjects = (panelId, folder) => {
        const panel = document.getElementById(panelId);
        panel.innerHTML = '';

        // Xóa các script trước đó (nếu có)
        document.querySelectorAll(`script[data-folder="${folder}"]`).forEach(s => s.remove());

        for (let i = 1; i <= 5; i++) {
            const script = document.createElement('script');
            script.src = `projets/${folder}-${i}.js`;
            script.dataset.folder = folder;

            script.onload = () => {
                const data = window[`project_${folder}_${i}`];
                if (!data) return;

                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                <img src="${data.image}" alt="${data.title}">
                <h4>${data.title}</h4>
                <div class="tags">${data.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}</div>
            `;
                card.addEventListener('click', () => showModal(data));
                panel.appendChild(card);
            };

            script.onerror = () => {
                // Khi file không tồn tại, dừng vòng lặp hoặc không làm gì
            };

            document.body.appendChild(script);
        }
    };



    const showModal = (data) => {
        document.getElementById('modal-body').innerHTML = `
      <h3>${data.title}</h3>
      <img src="${data.image}" style="max-width: 100%; border-radius: 12px; margin: 10px 0;">
      <div>${data.details}</div>
      <p><a href="${data.link}" target="_blank">Voir le projet</a></p>
      
    `;
        document.getElementById('project-modal').classList.add('show');
    };

    document.querySelector('.modal .close').onclick = () => {
        document.getElementById('project-modal').classList.remove('show');
    };

    // Load dữ liệu
    loadProjects('academic', 'academic');
    //loadProjects('personal', 'personal');
});
