<template>
    <li v-for="(requisite) in requisites" :key="requisite.id" class="requisite-item">
      <div class="requisite-content">
        <div class="requisite-header">
          <h3>{{ requisite.title }}</h3>
          <span class="course-code">{{ requisite.code }}</span>
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
  border: 1px solid #3498db;
  border-radius: 20px;
  margin: 10px;
  padding: 10px;
  list-style-type: none;
}

.requisite-content {
  padding: 10px;
}

.requisite-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-code {
  font-size: 14px;
  font-weight: bold;
  color: #3498db;
}

.requisite-details {
  margin-top: 10px;
}

.requisite-details p {
  margin: 5px 0;
}


.requisite-item::before {
  content: '└─'; /* Bullet */
  position: absolute;
  left: -20px;
  top: 20px;
  color: #3498db;
  font-size: 25px;
}
</style>
