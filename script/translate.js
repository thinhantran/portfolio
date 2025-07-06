let translations = {};

function switchLanguage(lang) {
    const scriptId = `lang-script-${lang}`;

    // Nếu ngôn ngữ đã được tải rồi → không cần tải lại
    if (translations[lang]) {
        applyTranslations(lang);
        return;
    }

    // Nếu chưa tải thì tạo <script> để tải file ngôn ngữ
    if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.src = `lang/${lang}.js`;
        script.id = scriptId;

        script.onload = () => {
            const loadedTranslations = window[`translations_${lang}`];
            if (!loadedTranslations) {
                console.error(`Dữ liệu ngôn ngữ "${lang}" không tìm thấy trong file lang/${lang}.js`);
                return;
            }

            translations[lang] = loadedTranslations;
            applyTranslations(lang);
        };

        script.onerror = () => {
            console.error(`Không thể tải file ngôn ngữ lang/${lang}.js`);
        };

        document.body.appendChild(script);
    }
}

function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) {
        console.error(`Dữ liệu dịch cho ngôn ngữ "${lang}" không tồn tại.`);
        return;
    }

    Object.keys(t).forEach(key => {
        const el = document.getElementById(key);
        if (el && typeof t[key] === 'string') {
            el.innerHTML = t[key];
        }
    });

    // Nếu có dữ liệu động như formation, experience
    if (t.formationData) {
        renderFormation(t.formationData, t.formationTitle);
    }

    if (t.experienceData) {
        renderExperience(t.experienceData, t.experienceTitle);
    }
    if (t.projectsTabs && t.projectsTitle) {
        renderProjects(t);
    }
    if (t.loisirsData && t.loisirsTitle) {
        renderLoisirs(t);
    }
}

// Gán listener cho select đổi ngôn ngữ
document.getElementById("languageSwitcher").addEventListener("change", function () {
    switchLanguage(this.value);
});

// Gọi lần đầu khi tải trang
document.addEventListener("DOMContentLoaded", () => {
    const defaultLang = document.getElementById("languageSwitcher").value;
    switchLanguage(defaultLang);
});

function renderFormation(data, titleText) {
    document.getElementById("formationTitle").textContent = titleText;
    const container = document.getElementById("formationTimeline");
    container.innerHTML = "";

    data.forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.className = "timeline-item";
        itemEl.innerHTML = `
      <div class="timeline-date">${item.date}</div>
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h3>${item.title}</h3>
        <span>${item.place}</span>
        ${item.details.map(line => `<p>${line}</p>`).join("")}
      </div>
    `;
        container.appendChild(itemEl);
    });
}

function renderExperience(data, titleText) {
    document.getElementById("experienceTitle").textContent = titleText;
    const container = document.getElementById("experienceTimeline");
    container.innerHTML = "";

    data.forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.className = "timeline-item";
        itemEl.innerHTML = `
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <span>${item.place}</span>
                ${item.details.map(line => `<p>${line}</p>`).join("")}
            </div>
        `;
        container.appendChild(itemEl);
    });
}

function renderProjects(t) {
    document.querySelector("#projects h2").textContent = t.projectsTitle;

    // Cập nhật tên các tab
    const tabs = document.querySelectorAll(".project-tabs .tab-btn");
    tabs.forEach(tab => {
        const tabKey = tab.dataset.tab;
        tab.textContent = t.projectsTabs[tabKey] || tab.textContent;
    });

    // Render nội dung tab Academic
    const academicPanel = document.getElementById("academic");
    academicPanel.innerHTML = t.projectsData.academic.map(proj => `
    <div class="project-item">
      <h3>${proj.title}</h3>
      <p>${proj.description}</p>
      ${proj.link ? `<a href="${proj.link}" target="_blank">View Project</a>` : ""}
    </div>
  `).join("");

    // Render nội dung tab Personal
    const personalPanel = document.getElementById("personal");
    personalPanel.innerHTML = t.projectsData.personal.map(proj => `
    <div class="project-item">
      <h3>${proj.title}</h3>
      <p>${proj.description}</p>
      ${proj.link ? `<a href="${proj.link}" target="_blank">View Project</a>` : ""}
    </div>
  `).join("");
}

function renderLoisirs(t) {
    document.querySelector("#loisirs h2").textContent = t.loisirsTitle;

    const grid = document.querySelector(".loisir-grid");
    grid.innerHTML = t.loisirsData.map(loisir => `
    <div class="loisir-item">
      <i class="${loisir.iconClass}"></i>
      <span>${loisir.label}</span>
    </div>
  `).join("");
}

document.getElementById("languageSwitcher").addEventListener("change", function () {
    switchLanguage(this.value);
});

document.addEventListener("DOMContentLoaded", () => {
    switchLanguage(document.getElementById("languageSwitcher").value);
});


