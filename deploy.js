#!/usr/bin/env node

/**
 * 傻瓜式部署脚本 - 使用 Cloudflare Pages
 * 不需要账号，直接上传获得临时链接
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 创建一个简单的静态文件服务器配置
const wranglerConfig = `
name = "kingzen"
compatibility_date = "2024-01-01"

[site]
bucket = "."
`;

fs.writeFileSync('wrangler.toml', wranglerConfig);

console.log('🚀 正在准备部署...');
console.log('📦 打包网站文件中...');

// 使用 npx 直接运行 wrangler pages deploy
const deployCmd = 'npx wrangler pages deploy . --project-name kingzen --branch main';

try {
  const result = execSync(deployCmd, { 
    encoding: 'utf8',
    stdio: 'pipe',
    timeout: 120000
  });
  console.log(result);
} catch (error) {
  console.log('⚠️  需要登录 Cloudflare...');
  console.log('请运行: npx wrangler login');
  console.log('然后在浏览器完成登录');
}
