<template>
  <div class="container">
    <div class="alert alert-warning" v-if="error">{{ error }}</div>
    <div class="jumbotron">
      <h3 class="display-5">新しいものを追加してください！</h3>
      <form action="" @submit.prevent="addTag">
        <div class="form-group">
          <input class="input form-control"
            autofocus autocomplete="off"
            placeholder="Type an arist name"
            v-model="newTag.name" />
        </div>
        <input type="submit" value="追加する" class="btn btn-outline-info" />
      </form>
    </div>
    <hr class="" />

    <ul class="row">
      <li class="col-md-3 m-4" v-for="tag in tags" :key="tag.id" :tag="tag">

        <div class="">
          <p class="">
            <svg class="" viewBox="0 0 20 20" width="20" height="20"><title>music tag</title><path d="M15.75 8l-3.74-3.75a3.99 3.99 0 0 1 6.82-3.08A4 4 0 0 1 15.75 8zm-13.9 7.3l9.2-9.19 2.83 2.83-9.2 9.2-2.82-2.84zm-1.4 2.83l2.11-2.12 1.42 1.42-2.12 2.12-1.42-1.42zM10 15l2-2v7h-2v-5z"></path></svg>
            {{ tag.name }}
          </p>

          <button class="btn btn-secondary"
          @click.prevent="editTag(tag)">Edit</button>

          <button class="btn btn-danger"
         @click.prevent="removeTag(tag)">Delete</button>
        </div>

        <div v-if="tag == editedTag">
          <form action="" @submit.prevent="updateTag(tag)">
            <div class="btn-group-vertical m-3">
              <input class="input form-control" v-model="tag.name" />
              <input type="submit" value="更新する" class="btn btn-secondary">
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RecordTags',
  data () {
    return {
      tags: [],
      newTag: [],
      error: '',
      editedTag: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/record_tags')
        .then(response => { this.tags = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addTag () {
      const value = this.newTag
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/record_tags/', { record_tag: { name: this.newTag.name } })
        .then(response => {
          this.tags.push(response.data)
          this.newTag = ''
        })
        .catch(error => this.setError(error, 'Cannot create Tag'))
    },
    removeTag (tag) {
      this.$http.secured.delete(`/api/v1/record_tags/${tag.id}`)
        .then(response => {
          this.tags.splice(this.tags.indexOf(tag), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete Tag'))
    },
    editTag (tag) {
      this.editedTag = tag
    },
    updateTag (tag) {
      this.editedTag = ''
      this.$http.secured.patch(`/api/v1/record_tags/${tag.id}`, { record_tag: { title: tag.name } })
        .catch(error => this.setError(error, 'Cannot update Tag'))
    }
  }
}
</script>
