// 渲染所有应用卡片
function renderAppCards(filteredApps = appsData) {
  const container = document.getElementById('appCardsContainer');
  container.innerHTML = ''; // 清空容器内容

  filteredApps.forEach(app => {
    const appCard = document.createElement('div');
    appCard.classList.add('app-card');
    appCard.innerHTML = `
      <img src="${app.imageUrl}" alt="${app.name}">
      <h3>${app.name} <span>${app.version}</span></h3>
      <p>${app.description}</p>
      <a href="${app.downloadUrl}" class="download-btn" download>下载</a>
    `;
    container.appendChild(appCard);
  });

  // 绑定下载按钮事件
  const downloadButtons = document.querySelectorAll('.download-btn');

  downloadButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const appCard = e.target.closest('.app-card');
      const appName = appCard.querySelector('h3').textContent;
      const downloadMessage = document.createElement('div');
      
      // 创建弹窗内容
      downloadMessage.classList.add('download-message');
      downloadMessage.innerHTML = `
        <span>正在下载 ${appName}，请查看下载列表</span>
        <button class="close-btn">X</button>
      `;
      
      // 弹窗显示
      document.body.appendChild(downloadMessage);
      
      // 关闭弹窗
      downloadMessage.querySelector('.close-btn').addEventListener('click', () => {
        downloadMessage.remove();
      });
      
      // 触发实际下载
      triggerDownload(appCard);
      
      // 自动关闭弹窗（5秒后关闭）
      setTimeout(() => {
        downloadMessage.remove();
      }, 5000);
    });
  });
}

// 触发下载（模拟下载）
function triggerDownload(appCard) {
  const downloadUrl = appCard.querySelector('.download-btn').getAttribute('href');
  
  // 创建一个虚拟的下载链接
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = ''; // 让浏览器知道这是一个下载链接
  document.body.appendChild(link);
  
  // 触发下载
  link.click();
  
  // 删除临时创建的链接
  document.body.removeChild(link);
}

// 分类过滤功能
function filterCategory(category) {
  const filteredApps = appsData.filter(app => app.category === category);
  renderAppCards(filteredApps);
}

// 搜索功能
function searchApps() {
  const query = document.getElementById('searchBox').value.toLowerCase();
  const filteredApps = appsData.filter(app => app.name.toLowerCase().includes(query));
  renderAppCards(filteredApps);
}

// 初始化应用商店
document.addEventListener('DOMContentLoaded', () => {
  renderAppCards(); // 渲染所有应用
});
