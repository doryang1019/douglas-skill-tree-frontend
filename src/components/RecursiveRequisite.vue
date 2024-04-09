<template>
    <li v-for="(requisite) in requisites" :key="requisite.id" class="requisite-item">
      <div class="requisite-content">
        <div class="requisite-header">
          <h3>{{ requisite.title }}</h3>
        </div>
        <div class="requisite-details">
          <p><strong>Course ID:</strong> {{ requisite.id }}</p>
          <p><strong>Course Title:</strong> {{ requisite.title }}</p>
          <p><strong>Course Code:</strong> {{ requisite.code }}</p>
        </div>
      </div>
      <ul v-if="requisite.requisitesOf.length > 0">
        <recursive-requisite :requisites="requisite.requisitesOf" />
      </ul>
    </li>
  </template>

  <script>
  export default {
    name: 'RecursiveRequisite',
    props: ['requisites']
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
