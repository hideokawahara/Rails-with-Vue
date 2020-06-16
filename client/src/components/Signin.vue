<template>
  <div class="text-center container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h3 class="card-title text-center">Sign In</h3>
            <form @submit.prevent="signin">
              <div class="" v-if="error">{{ error }}</div>

              <div class="m-2">
                <label for="email" class="">E-mail Address</label>
                <input type="email" v-model="email" class="form-control" id="email" placeholder="アドレス打ってね">
              </div>

              <div class="m-2">
                <label for="password" class="">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" placeholder="パスワード">
              </div>

              <button type="submit" class="btn btn-lg btn-primary btn-block">Sign In</button>

              <div class=""><router-link to="/signup" class="m-4">Sign up</router-link></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/details')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/details')
      }
    }
  }
}
</script>

<style scoped>
.bg-green {
  background-color: aqua;
}

.bg-green:hover {
  background-color: aquamarine;
}
</style>
