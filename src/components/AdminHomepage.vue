<template>
    <div>
      <h1>Welcome</h1>
      <button>
        <router-link to="/" @click="logout">Logout</router-link>
      </button>
      <button @click="btnAllCoursesHandler">All courses</button>
      <button>
        <router-link to="/admin/add">Add Course</router-link>
      </button>
      <button>
        <router-link to="/admin/update">Update Course</router-link>
      </button>
      <button>
        <router-link to="/admin/delete">Delete Course</router-link>
      </button>
      <button>
        <router-link to="/admin/findCSS">Find Course Status Of Student</router-link>
      </button>
      <button>
        <router-link to="/admin/addUser">Add User</router-link>
      </button>

      <div v-if="showCourses && courses">
        <h2>All Courses</h2>
        <div v-for="course in courses" :key="course.id" class="course-card">
          <h3>{{ course.title }}</h3>
          <p>Code: {{ course.code }}</p>
          <p>Status: {{ course.status }}</p>
          <div v-if="course.requisitesOf.length > 0">
            <p>Requisites of:</p>
            <ul>
              <recursive-requisite :requisites="course.requisitesOf" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
import RecursiveRequisite from '@/components/RecursiveRequisite.vue';
import AdminService from '@/services/AdminService';

export default {
  name: "adminHomePage",
  components: {
    RecursiveRequisite
  },
  data() {
    return {
      courses: null,
      showCourses: false,
    }
  },
  methods: {
    logout(event) {
      event.preventDefault();
      localStorage.removeItem('uid');
      localStorage.removeItem('uName');
    },
    retrieveCourses() {
      AdminService.getAllCourse()
        .then(res => {
          this.courses = res.data;
        })
        .catch(err => {
          console.error("Error fetching courses:", err);
        });
    },
    btnAllCoursesHandler() {
      this.showCourses = true;
      this.retrieveCourses();
    }
  }
};
</script>

<style scoped>
.course-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.course-card h3 {
  margin-top: 0;
}

.course-card ul {
  margin-top: 5px;
  margin-bottom: 0;
}

.course-card ul li {
  list-style: none;
}
</style>
