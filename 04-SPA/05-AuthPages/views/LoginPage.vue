<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          type="email"
          placeholder="demo@email"
          class="form-control"
          v-model="email"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          type="password"
          placeholder="password"
          class="form-control"
          v-model="password"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link to="/register" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',

  data() {
    return {
      email: undefined,
      password: undefined,
    };
  },

  methods: {
    async onSubmit() {
      if (!this.email) {
        alert('Требуется ввести Email');
        return false;
      }
      if (!this.password) {
        alert('Требуется ввести пароль');
        return false;
      }

      let response = await login(this.email, this.password);
      if (response.statusCode &&  (response.statusCode!== 200)) {
        alert(response.message);
        return false;
      }

      alert(response.fullname);
      return true;
    },
  },
};
</script>

<style scoped>
.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
</style>
