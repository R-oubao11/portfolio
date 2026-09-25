/* =========================================================
   项目数据
   后续新增项目时，只需在此数组中追加一条记录即可，
   页面会自动按纵向布局渲染，无需改动 HTML / CSS。
========================================================= */
const PROJECTS = [
  {
    name: "课语通",
    desc: "基于大语言模型的课程问答助手。用户上传课程资料后，系统能够建立知识索引，根据课程内容回答问题，并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。",
    tech: ["Python", "FastAPI", "RAG", "向量检索", "大语言模型 API", "Streamlit"],
    date: "2026.07",
    category: "AI 应用",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20course%20assistant%20chat%20web%20interface%2C%20question%20answering%20with%20cited%20references%20panel%2C%20knowledge%20base%20document%20upload%20sidebar%2C%20clean%20modern%20UI%20design%2C%20warm%20light%20theme%2C%20professional%20product%20screenshot&image_size=landscape_16_9",
  },
  {
    name: "城市脉搏",
    desc: "城市实时交通与天气数据可视化大屏，用于集中展示交通、天气和城市运行信息。项目通过多数据源轮询聚合数据，并结合 SVG 图表、Canvas 粒子地图和响应式布局实现大屏可视化展示。",
    tech: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
    date: "2026.03",
    category: "数据可视化",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=city%20traffic%20and%20weather%20data%20visualization%20dashboard%20on%20large%20screen%2C%20dark%20theme%20with%20glowing%20map%20and%20particle%20effects%2C%20charts%20and%20metrics%20panels%2C%20futuristic%20control%20room%20style%2C%20professional%20UI%20design&image_size=landscape_16_9",
  },
  {
    name: "拾光集市",
    desc: "面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。",
    tech: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    date: "2025.09",
    category: "Web 应用",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=campus%20second-hand%20marketplace%20web%20application%20interface%2C%20product%20listing%20grid%20with%20photos%20and%20prices%2C%20search%20bar%20and%20chat%20messages%20panel%2C%20fresh%20clean%20modern%20UI%20design%2C%20professional%20product%20screenshot&image_size=landscape_16_9",
  },
  {
    name: "轻记账",
    desc: "面向日常生活场景的极简记账微信小程序，重点解决快速记录和查看个人收支的问题。项目支持语音快捷记账、月度收支统计和预算提醒，并使用微信云开发完成数据存储与后端能力。",
    tech: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    date: "2025.04",
    category: "移动应用",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimal%20expense%20tracker%20mobile%20app%20interface%2C%20monthly%20income%20and%20expense%20statistics%20chart%2C%20budget%20progress%20bar%2C%20clean%20simple%20mobile%20UI%20design%2C%20soft%20green%20and%20white%20color%20scheme%2C%20professional%20mockup&image_size=landscape_16_9",
  },
];

/* =========================================================
   渲染项目列表
========================================================= */
function renderProjects() {
  const list = document.getElementById("projectList");
  const total = PROJECTS.length;

  list.innerHTML = PROJECTS.map((p, i) => {
    const no = String(i + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
    const tags = p.tech.map((t) => `<span class="project__tag">${t}</span>`).join("");
    return `
      <article class="project">
        <div class="project__media">
          <img src="${p.image}" alt="${p.name} 项目截图" />
          <span class="project__no">${no}</span>
        </div>
        <div class="project__body">
          <span class="project__cat">${p.category}</span>
          <h3 class="project__name">${p.name}</h3>
          <p class="project__desc">${p.desc}</p>
          <div class="project__meta">${tags}</div>
          <p class="project__date">完成于 ${p.date}</p>
        </div>
      </article>`;
  }).join("");
}

/* =========================================================
   导航高亮（滚动监听）
========================================================= */
function setupScrollSpy() {
  const links = document.querySelectorAll(".nav__link");
  const sections = ["projects", "about", "contact"].map((id) => document.getElementById(id));

  function onScroll() {
    const pos = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0].id;
    for (const sec of sections) {
      if (sec.offsetTop <= pos) current = sec.id;
    }
    links.forEach((l) => l.classList.toggle("is-active", l.dataset.nav === current));
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* =========================================================
   移动端抽屉导航
========================================================= */
function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mobileNav");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.addEventListener("click", (e) => {
    if (e.target.matches(".mobile-nav__link")) {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* =========================================================
   主题切换（深色 / 浅色）
========================================================= */
const THEME_KEY = "theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    const dark = theme === "dark";
    btn.setAttribute("aria-pressed", String(dark));
    btn.setAttribute("aria-label", dark ? "切换到浅色主题" : "切换到深色主题");
  });
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const theme = saved === "dark" || saved === "light" ? saved : "light";
  applyTheme(theme);

  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  });
}

/* =========================================================
   滚动渐显动画
========================================================= */
function setupReveal() {
  const targets = document.querySelectorAll(
    ".section__head, .project, .about__text, .about__info, .contact__item, .profile, .skills, .sidebar__footer, .main__footer"
  );

  if (!("IntersectionObserver" in window)) return;

  targets.forEach((el) => {
    el.classList.add("reveal");
    // 列表项（项目/联系方式）依次轻微错开，营造节奏感
    if (el.matches(".project, .contact__item")) {
      const index = Array.from(el.parentElement.children).indexOf(el);
      el.style.transitionDelay = `${Math.min(index, 4) * 70}ms`;
    }
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach((el) => io.observe(el));
}

renderProjects();
setupScrollSpy();
setupMobileNav();
setupReveal();
initTheme();
