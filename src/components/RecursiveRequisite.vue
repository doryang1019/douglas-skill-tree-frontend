<template>
    <li v-for="(requisite) in requisites" :key="requisite.id" class="requisite-item" :style="{ backgroundColor: requisite.status.taken ? requisite.status.done ? '#B0C5A4' : '#eee8aa' : '#FEFDED'}">
      <div class="requisite-content">
        <div class="requisite-header">
          <h3>{{ requisite.title }}</h3>
        </div>
        <div class="requisite-details">
          <p><strong>Code:</strong> {{ requisite.code }}</p>
          <p v-if="!isAdmin"><strong>Status: {{ requisite.status ? requisite.status.taken ? requisite.status.done ? "Finished &#9873;" : "Progressing &#9872;" : "Not Taken" :  "NA"}}</strong></p>
        </div>
      </div>
      <ul v-if="requisite.requisitesOf.length > 0">
        <p><strong>Requisites of:</strong></p>
        <recursive-requisite :requisites="requisite.requisitesOf" />
      </ul>
    </li>
  </template>

  <script>
  export default {
    name: 'RecursiveRequisite',
    props: ['requisites'],
    data() {
        return {
            isAdmin: false,
        }
    },
    mounted() {
        console.log(localStorage.getItem('isAdmin').toString());
        this.isAdmin = localStorage.getItem('isAdmin').toString() === "true" ? true : false;
    }
  };
  </script>

<style scoped>
.requisite-item {
  margin-left: 20px;
  position: relative;
  border: 2px solid #a29988;
  border-radius: 20px;
  margin: 10px;
  padding: 10px;
  list-style-type: none;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.requisite-content {
  padding: 10px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.requisite-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.course-code {
  font-size: 14px;
  font-weight: bold;
  color: #a29988;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.requisite-details {
  margin-top: 10px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.requisite-details p {
  margin: 5px 0;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}


.requisite-item::before {
  content: '└─'; /* Bullet */
  position: absolute;
  left: -20px;
  top: 20px;
  color: #a29988;
  font-size: 25px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
