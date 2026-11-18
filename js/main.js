// ===== 主题切换（记住用户选择）=====
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme')

  || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
root.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '️' : '';

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '️' : '';
});

// ===== 移动端菜单 =====
const hamburger = document.getElementById('nav-hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// 点击菜单项后自动收起
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// ===== 滚动：导航栏阴影 + 当前区块高亮 =====
const header = document.getElementById('header');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 20);

  let current = 'home';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== 滚动进入动画 =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== 表单提交（静态站需接第三方服务，此处为示例）=====
const form = document.getElementById('contact-form');
const tip = document.getElementById('form-tip');

form.addEventListener('submit', async e => {
  e.preventDefault();

  // 方式一：使用 Formspree 等第三方表单服务
  // const res = await fetch('https://formspree.io/f/你的ID', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(Object.fromEntries(new FormData(form)))
  // });
  // tip.textContent = res.ok ? '已发送，谢谢！' : '发送失败，请稍后重试';

  // 方式二：使用 Cloudflare Worker 做后端，见 README
  tip.textContent = '演示模式：请接入表单服务后再启用提交。';
  form.reset();
});

// ===== 页脚年份 =====
document.getElementById('year').textContent = new Date().getFullYear();
