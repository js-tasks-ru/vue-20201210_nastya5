<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" class="form-control" v-model="email" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input type="text" class="form-control" v-model="fullname" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password2" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"
        ><input type="checkbox" v-model="agreement" /> Я согласен с условиями
        <span></span
      ></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link to="/login" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',

  data() {
    return {
      email: undefined,
      fullname: undefined,
      password: undefined,
      password2: undefined,
      agreement: false,
    };
  },

  methods: {
    async onSubmit() {
      if (!this.email) {
        alert('Требуется ввести Email');
        return false;
      }
      if (!this.fullname) {
        alert('Требуется ввести полное имя');
        return false;
      }
      if (!this.password) {
        alert('Требуется ввести пароль');
        return false;
      }
      if (this.password !== this.password2) {
        alert('Пароли не совпадают');
        return false;
      }
      if (!this.agreement) {
        alert('Требуется согласиться с условиями');
        return false;
      }

      let response = await register(this.email, this.fullname, this.password);
      if (response.statusCode && response.statusCode !== 200) {
        alert(response.message);
        return false;
      }

      alert(response.id);
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