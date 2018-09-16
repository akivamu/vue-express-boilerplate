<template>
  <div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Enter your name" v-model="name"
             @change="onVisitorNameChanged">
    </div>
  </div>
</template>

<script>
export default {
  name: 'VisitorNameInput',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    onVisitorNameChanged () {
      this.$store.dispatch('setVisitorName', this.name)
    }
  }
}
</script>

<style scoped>
</style>
