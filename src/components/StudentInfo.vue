<template>
  <div class="container">
    <!-- Vertical navbars -->
    <div class="header">
          <h2 class="title">User Information</h2>
      </div>
    <div class="nav-bar">
      <ul>
        <li @click="showTab('info')" :class="{ active: activeTab === 'info' }">Student Info</li>
        <li @click="showTab('courseStatus')" :class="{ active: activeTab === 'courseStatus' }">Student Course Status</li>
        <li @click="returnToMainPage">Back to Main Page</li>
      </ul>
    </div>

    <!-- Content area -->
    <div>
      <div v-if="activeTab === 'info'">
        <div class="info">
          <label>Student ID:</label>
          <p>{{ studentInfo.id }}</p>
        </div>
        <div class="info">
          <label>Student Name:</label>
          <p>{{ studentInfo.name }}</p>
        </div>
        <div class="info">
          <label>Program:</label>
          <p>{{ studentInfo.program ? studentInfo.program.description : "None" }}</p>
        </div>

      </div>
      <div v-else-if="activeTab === 'courseStatus'">
        <h2>Student Course Status</h2>
        <!-- Display student course status here -->
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Submit</th>
                </tr>
              </thead>
              <tbody v-for="course in courses" :key="course.id" class="course-card">
                <td>{{ course.title }}({{ course.code }})</td>
                <td>
                  <select v-model="course.selectedStatus" >
                    <option value="Not" :selected="!course.status || !course.status.taken">Not Taken</option>
                    <option value="Progressing" :selected="course.status && course.status.taken && !course.status.done">Progressing</option>
                    <option value="Finished" :selected="course.status && course.status.taken && course.status.done">Finished</option>
                  </select>
              </td>
                <td><button @click="updateCourseStatus(course.id, studentInfo.id, course.selectedStatus)">Update</button></td>
              </tbody>
            </table>
      </div>
    </div>
  </div>
</template>

<script>
import CourseService from '@/services/CourseService';
export default {
  name: 'StudentInfo',
  data() {
    return {
      activeTab: 'info', // Default tab to display
      status: {
        taken: false,
        done: false
      },
      message: "",
      studentInfo: {
        name: '',
        program: { description: "", id: "", stream: 0},
        id: "",
        courses: null,
      }
    };
  },
  methods: {
    showTab(tabName) {
      this.activeTab = tabName;
    },
    returnToMainPage() {
      // Redirect to the main page
      this.$router.push({ name: 'adminHomePage' });
    },
    updateCourseStatus(courseId, userId, status){
      let isTaken = null;
      let isDone = null;
      if(status == "Finished"){
        isTaken = true;
        isDone = true;
      } else if(status == "Progressing"){
        isTaken = true;
        isDone = false;
      } else {
        isTaken = false;
        isDone = false;
      }
      CourseService.updateCourseStatus(courseId, userId, isTaken, isDone)
      .then(() => {
        this.message = "update successful."
      });
    },
  },
  mounted() {
      this.studentInfo.name = localStorage.getItem("userName");
      this.studentInfo.id = localStorage.getItem('userId');
      this.studentInfo.program = JSON.parse(localStorage.getItem('program'));
      if(this.studentInfo.program && this.studentInfo.id){
        CourseService.getCoursesByProgram(this.studentInfo.program.id, this.studentInfo.id)
      .then(response => {
        this.courses = response.data.map(course => {
          let selectedStatus = "";
          if (course.status) {
            if (course.status.done) {
              selectedStatus = "Finished";
            } else if (course.status.taken) {
              selectedStatus = "Progressing";
            } else {
              selectedStatus = "Not";
            }
          } else {
            selectedStatus = "NA";
          }
          return {
            ...course,
            selectedStatus: selectedStatus
          };
        });
      })
      .catch(err => {
        console.error("Error fetching courses:", err);
      });
      }
  }
};
</script>

<style scoped>
.nav-bar {
  margin-bottom: 10px;
}
.nav-bar ul {
  display: flex;
  justify-content: space-between; /* Distribute items evenly */
  list-style-type: none;
  margin-bottom: 10px;
}

.nav-bar ul li {
  margin-bottom:10px;
  padding: 8px 20px; /* Adjust padding as needed */
  background-color: #b7b1a5;
  color: #080710;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.nav-bar ul li:hover {
  background-color: #cac3bb;
}

label {
  text-align: center;
}
.container {
  padding: 20px;
  width: 70%;
  align-content: center;
justify-content: center;
margin: auto;
}

.header {
  border: 2px solid #000;
  border-radius: 5%;
  padding: 10px;
  text-align: center;
  margin-bottom: 10px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}
.info {
  width: 70%;
  margin: 0 auto;
  display: flex;
  align-items: center; /* Align items vertically */
  font-weight: bold;
  font-size: 20px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.info label {
  margin-right: 10px; /* Adjust margin between label and p */
}

.info p {
  margin-left: 20px;
}



.searchbtn {
  background-color: #d8caaf;
  color: white;
  padding: 15px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 5px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

.searchbtn:hover {
  background-color: #d3d4cc;
}

.searchbar {
  width: 300px;
  height: 30px;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}
.searchbar-list {
  width: 350px;
  height: 350px;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

.text-f {
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

.button-container {
  text-align: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}
</style>
