const translations = {
    fr: {
        nav_about: "À propos",
        nav_skills: "Compétences",
        nav_formation: "Formation",
        nav_experience: "Expériences",
        nav_projects: "Projets",
        nav_hobbies: "Loisirs",
        nav_contact: "Contact",
        heroTitle: "Bonjour, je suis <span class='highlight'>TRAN Thi Nhan</span>",
        heroSubtitle: "Développeuse Fullstack Junior",
        aboutTitle: "À propos de moi",
        aboutText: "Développeuse passionnée par le web et les nouvelles technologies. J'aime apprendre, résoudre des problèmes complexes et créer des interfaces intuitives.",
        skillsTitle: "Compétences",
        contactTitle: "Contact",
        contactPhone: "Téléphone : +33 6 12 34 56 78",
        contactEmail: "Email : example@gmail.com",
        contactGitHub: "GitHub : <a href='https://github.com/username' target='_blank'>username</a>",
        contactAddress: "Adresse : 123 Rue Exemple, 75000 Paris, France",
    },
    en: {
        nav_about: "About",
        nav_skills: "Skills",
        nav_formation: "Education",
        nav_experience: "Experience",
        nav_projects: "Projects",
        nav_hobbies: "Hobbies",
        nav_contact: "Contact",
        heroTitle: "Hello, I’m <span class='highlight'>TRAN Thi Nhan</span>",
        heroSubtitle: "Junior Fullstack Developer",
        aboutTitle: "About Me",
        aboutText: "Passionate developer about the web and new technologies. I love learning, solving complex problems, and creating intuitive interfaces.",
        skillsTitle: "Skills",
        contactTitle: "Contact",
        contactPhone: "Phone: +33 6 12 34 56 78",
        contactEmail: "Email: example@gmail.com",
        contactGitHub: "GitHub: <a href='https://github.com/username' target='_blank'>username</a>",
        contactAddress: "Address: 123 Rue Exemple, 75000 Paris, France",
    },
    vi: {
        nav_about: "Giới thiệu",
        nav_skills: "Kỹ năng",
        nav_formation: "Học vấn",
        nav_experience: "Kinh nghiệm",
        nav_projects: "Dự án",
        nav_hobbies: "Sở thích",
        nav_contact: "Liên hệ",
        heroTitle: "Xin chào, tôi là <span class='highlight'>TRAN Thi Nhan</span>",
        heroSubtitle: "Lập trình viên Fullstack sơ cấp",
        aboutTitle: "Về tôi",
        aboutText: "Tôi là một lập trình viên đam mê web và công nghệ mới. Tôi thích học hỏi, giải quyết vấn đề và tạo ra giao diện thân thiện.",
        skillsTitle: "Kỹ năng",
        contactTitle: "Liên hệ",
        contactPhone: "Điện thoại: +33 6 12 34 56 78",
        contactEmail: "Email: example@gmail.com",
        contactGitHub: "GitHub: <a href='https://github.com/username' target='_blank'>username</a>",
        contactAddress: "Địa chỉ: 123 Rue Exemple, 75000 Paris, France",
    },
};

function switchLanguage(lang) {
    const keys = Object.keys(translations[lang]);
    keys.forEach((key) => {
        const element = document.getElementById(key);
        if (element) {
            element.innerHTML = translations[lang][key];
        }
    });
}

document.getElementById("languageSwitcher").addEventListener("change", function () {
    const selectedLang = this.value;
    switchLanguage(selectedLang);
});

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
