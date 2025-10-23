const { createApp } = Vue;

createApp({
  data() {
    return {
      username: '',
      profile: null,
      error: '',
      loading: false
    };
  },
  methods: {
    async fetchProfile() {
      this.error = '';
      this.profile = null;
      if (!this.username) return;

      this.loading = true;
      try {
        const res = await fetch(`https://api.github.com/users/${this.username}`);
        if (!res.ok) throw new Error('User not found');
        this.profile = await res.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
}).mount('#app');
