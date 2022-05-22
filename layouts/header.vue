<template>
  <nav class="container">
    <ul class="header">
      <li>
        <h1 class="header-logo"><a href="#"><img src="/img/logo.png" alt="ロゴ"></a></h1>
      </li>
      <li class="header-menu">
        <NuxtLink to="/register" class="header-menu-item">新規登録</NuxtLink>
        <NuxtLink to="/login" class="header-menu-item">ログイン</NuxtLink>
      </li>
    </ul>
    <Nuxt />
  </nav>
</template>