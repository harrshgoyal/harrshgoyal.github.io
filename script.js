const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const savedTheme = localStorage.getItem('personal-site-theme');
if (savedTheme !== 'light') root.classList.add('dark');
function updateThemeControl() {
  const isDark = root.classList.contains('dark');
  themeLabel.textContent = isDark ? 'Light mode' : 'Dark mode';
  themeButton.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
}
updateThemeControl();
themeButton.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('personal-site-theme', root.classList.contains('dark') ? 'dark' : 'light');
  updateThemeControl();
});
const filters = [...document.querySelectorAll('.filter')];
const projects = [...document.querySelectorAll('.project')];
const emptyMessage = document.querySelector('.filter-empty');
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  let visible = 0;
  projects.forEach(project => {
    const show = category === 'all' || project.dataset.category === category;
    project.hidden = !show;
    if (show) visible++;
  });
  emptyMessage.hidden = visible > 0;
}));
document.querySelector('#year').textContent = new Date().getFullYear();
