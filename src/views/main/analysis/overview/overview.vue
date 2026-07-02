<template>
  <div class="overview">
    <div class="overview-hero">
      <h1 class="overview-hero-title">商城后台管理系统</h1>
      <p class="overview-hero-desc">
        基于 Vue3 + TypeScript + Element Plus
        构建的现代化后台管理平台，集用户管理、角色权限、商品管理、菜单配置等功能于一体。
      </p>
    </div>
    <el-card shadow="hover" class="overview-card">
      <template #header>
        <h2 class="card-title">项目介绍</h2>
      </template>
      <p class="card-text">
        本项目是一个功能完整的商城后台管理系统，采用前后端分离架构。前端基于
        <strong>Vue 3</strong> 组合式 API 和 <strong>TypeScript</strong> 开发，使用
        <strong>Element Plus</strong> 组件库构建界面；后端基于
        <strong>Node.js + Express</strong> 框架，使用
        <strong>lowdb</strong> 作为轻量级数据库，并通过
        <strong>JWT</strong> 实现身份认证。系统支持基于
        <strong>RBAC</strong
        >（基于角色的访问控制）模型的细粒度权限管理，覆盖菜单级与按钮级权限控制。
      </p>
    </el-card>

    <el-card shadow="hover" class="overview-card">
      <template #header>
        <h2 class="card-title">技术栈</h2>
      </template>
      <el-row :gutter="16">
        <el-col :span="6" v-for="tech in techStack" :key="tech.name">
          <div class="tech-item">
            <div class="tech-icon" :style="{ background: tech.bg }">
              <el-icon :size="24"><component :is="tech.icon" /></el-icon>
            </div>
            <span class="tech-name">{{ tech.name }}</span>
            <span class="tech-desc">{{ tech.desc }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover" class="overview-card">
          <template #header>
            <h2 class="card-title">核心功能</h2>
          </template>
          <ul class="feature-list">
            <li v-for="item in features" :key="item">
              <el-icon color="#67c23a"><Check /></el-icon>
              <span>{{ item }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="overview-card">
          <template #header>
            <h2 class="card-title">项目亮点</h2>
          </template>
          <ul class="feature-list">
            <li v-for="item in highlights" :key="item">
              <el-icon color="#e6a23c"><Star /></el-icon>
              <span>{{ item }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { Key, Check, Star, Monitor, Setting, Platform, Grid } from '@element-plus/icons-vue'

const techStack = [
  { name: 'Vue 3', desc: '渐进式框架', icon: shallowRef(Platform), bg: '#ebf8ee' },
  { name: 'TypeScript', desc: '类型安全', icon: shallowRef(Platform), bg: '#e8f0fe' },
  { name: 'Element Plus', desc: 'UI 组件库', icon: shallowRef(Grid), bg: '#e6f7ff' },
  { name: 'Node.js', desc: '服务端运行时', icon: shallowRef(Monitor), bg: '#f0f5e8' },
  { name: 'Express', desc: 'Web 框架', icon: shallowRef(Setting), bg: '#f5f5f5' },
  { name: 'lowdb', desc: '轻量数据库', icon: shallowRef(Grid), bg: '#fff7e6' },
  { name: 'JWT', desc: '身份认证', icon: shallowRef(Key), bg: '#fef0f0' },
  { name: 'RBAC', desc: '权限模型', icon: shallowRef(Setting), bg: '#f3e8ff' },
]

const features = [
  '用户管理：支持用户新增、编辑、删除、禁用 / 启用等操作',
  '角色管理：基于 RBAC 模型，灵活分配菜单与按钮级权限',
  '菜单管理：动态菜单树配置，支持多级嵌套与权限关联',
  '部门管理：组织架构维护，人员归属清晰',
  '商品管理：商品列表与分类的完整 CRUD 操作',
  '登录认证：JWT Token 机制，支持密码与验证码双模式登录',
  '权限控制：菜单级 + 按钮级双重权限过滤，精确到操作粒度',
  '数据持久化：lowdb JSON 数据库，轻量高效，前后端平滑对接',
]

const highlights = [
  'TypeScript 全覆盖：类型安全编码，降低运行时错误风险',
  '组合式 API：Vue 3 Composition API 编写，逻辑复用更灵活',
  '泛型组件封装：page-content / page-modal 等核心组件高度抽象',
  '递归菜单渲染：菜单树无限层级支持，自动构建父子关系',
  '权限过滤引擎：后台自动识别叶子节点与父节点勾选状态',
  'el-tree 深度集成：半选、级联、回显等状态精确控制',
  '前后端契约一致：接口规范对齐，mock 到真实服务无缝迁移',
  '模块化架构：路由、状态管理、API 层清晰分层，易于扩展',
]
</script>

<style lang="less" scoped>
.overview {
  padding: 8px 0;

  &-hero {
    text-align: center;
    padding: 48px 0 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    margin-bottom: 24px;
    color: #fff;

    &-title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 12px;
      letter-spacing: 2px;
    }

    &-desc {
      font-size: 15px;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.8;
    }
  }

  &-section {
    margin-bottom: 16px;
  }

  &-card {
    margin-bottom: 20px;
  }
}

.stat-card {
  &-inner {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 0;
  }

  .stat-info {
    display: flex;
    flex-direction: column;

    .stat-num {
      font-size: 28px;
      font-weight: 700;
      color: #303133;
    }

    .stat-label {
      font-size: 13px;
      color: #909399;
      margin-top: 2px;
    }
  }
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  padding-left: 8px;
  border-left: 3px solid #409eff;
}

.card-text {
  font-size: 14px;
  line-height: 1.9;
  color: #606266;
  margin: 0;

  strong {
    color: #409eff;
  }
}

.tech-item {
  text-align: center;
  padding: 20px 8px 16px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  .tech-icon {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px;
    color: #606266;
  }

  .tech-name {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 4px;
  }

  .tech-desc {
    display: block;
    font-size: 12px;
    color: #909399;
  }
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 0;
    font-size: 14px;
    color: #606266;
    line-height: 1.6;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    .el-icon {
      flex-shrink: 0;
      margin-top: 2px;
    }
  }
}
</style>
