<template>
  <div class="user-detail">
    <!-- 顶部头像区 -->
    <div class="profile-header">
      <el-avatar :src="userInfo.avatarUrl || DEFAULT_AVATAR_URL" :size="80" />
      <div class="profile-meta">
        <h2 class="profile-name">{{ userInfo.realname || userInfo.name }}</h2>
        <p class="profile-role">
          <el-icon><Avatar /></el-icon>
          {{ userInfo.role?.name || '-' }}
        </p>
      </div>
    </div>

    <!-- 信息卡片区 -->
    <div class="info-cards">
      <!-- 基本信息 -->
      <div class="info-card">
        <h3 class="card-title">
          <el-icon><User /></el-icon>
          <span>基本信息</span>
        </h3>
        <div class="card-body">
          <div class="info-row">
            <span class="label">用户名</span>
            <span class="value">{{ userInfo.name }}</span>
          </div>
          <div class="info-row">
            <span class="label">真实姓名</span>
            <span class="value">{{ userInfo.realname || '-' }}</span>
          </div>
          <div class="info-row">
            <span class="label">手机号</span>
            <span class="value">{{ userInfo.phone || '-' }}</span>
          </div>
          <div class="info-row">
            <span class="label">账号状态</span>
            <span class="value">
              <el-tag :type="userInfo.enabled ? 'success' : 'danger'" size="small">
                {{ userInfo.enabled ? '已启用' : '已禁用' }}
              </el-tag>
            </span>
          </div>
        </div>
      </div>

      <!-- 角色信息 -->
      <div class="info-card">
        <h3 class="card-title">
          <el-icon><Avatar /></el-icon>
          <span>角色信息</span>
        </h3>
        <div class="card-body">
          <div class="info-row">
            <span class="label">角色名称</span>
            <span class="value">{{ userInfo.role?.name || '-' }}</span>
          </div>
          <div class="info-row">
            <span class="label">角色描述</span>
            <span class="value">{{ userInfo.role?.intro || '-' }}</span>
          </div>
          <div class="info-row">
            <span class="label">创建时间</span>
            <span class="value">{{
              userInfo.role?.createAt ? formatTime(userInfo.role.createAt) : '-'
            }}</span>
          </div>
        </div>
      </div>

      <!-- 部门信息 -->
      <div class="info-card">
        <h3 class="card-title">
          <el-icon><OfficeBuilding /></el-icon>
          <span>部门信息</span>
        </h3>
        <div class="card-body">
          <div class="info-row">
            <span class="label">所属部门</span>
            <span class="value">{{ userInfo.department?.name || '-' }}</span>
          </div>
          <div class="info-row">
            <span class="label">部门负责人</span>
            <span class="value">{{ userInfo.department?.leader || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- 时间信息 -->
      <div class="info-card">
        <h3 class="card-title">
          <el-icon><Clock /></el-icon>
          <span>时间信息</span>
        </h3>
        <div class="card-body">
          <div class="info-row">
            <span class="label">创建时间</span>
            <span class="value">{{ formatTime(userInfo.createAt) }}</span>
          </div>
          <div class="info-row">
            <span class="label">更新时间</span>
            <span class="value">{{ formatTime(userInfo.updateAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_AVATAR_URL } from '@/global/constant'
import { useUserInfoStore } from '@/stores/userinfo'
import { storeToRefs } from 'pinia'
import { User, Avatar, OfficeBuilding, Clock } from '@element-plus/icons-vue'

const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)

const formatTime = (time: string) => {
  if (!time) return '-'
  return new Date(time).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style lang="less" scoped>
.user-detail {
  padding: 24px;
  max-width: 960px;
  margin: 0 auto;

  .profile-header {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 32px;
    background: var(--bg-card);
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-card);
    margin-bottom: 20px;
    transition:
      background-color var(--transition),
      box-shadow var(--transition);

    .profile-meta {
      .profile-name {
        margin: 0 0 6px;
        font-size: 22px;
        font-weight: 700;
        color: var(--text-primary);
        transition: color var(--transition);
      }
      .profile-role {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: var(--text-secondary);
      }
    }
  }

  .info-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    .info-card {
      background: var(--bg-card);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-card);
      padding: 24px;
      transition:
        background-color var(--transition),
        box-shadow var(--transition);

      .card-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 20px;
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
        padding-bottom: 14px;
        border-bottom: 1px solid var(--border-light);
        transition:
          color var(--transition),
          border-color var(--transition);
      }

      .card-body {
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;

          & + .info-row {
            border-top: 1px solid var(--border-light);
            transition: border-color var(--transition);
          }

          .label {
            font-size: 14px;
            color: var(--text-secondary);
          }

          .value {
            font-size: 14px;
            color: var(--text-primary);
            font-weight: 500;
            transition: color var(--transition);
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .user-detail {
    padding: 16px;

    .profile-header {
      flex-direction: column;
      text-align: center;
    }

    .info-cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>
