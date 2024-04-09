<template>
    <div class="container">
      <!-- Vertical navbars -->
      <div class="nav">
        <ul>
          <li @click="showTab('info')" :class="{ active: activeTab === 'info' }">Student Info</li>
          <li @click="showTab('courseStatus')" :class="{ active: activeTab === 'courseStatus' }">Student Course Status</li>
          <li @click="returnToMainPage">Back to Main Page</li>
        </ul>
      </div>

      <!-- Content area -->
      <div class="content">
        <div v-if="activeTab === 'info'">
          <h2>Student Information</h2>
          <div>
            <label>Name:</label>
            <p>{{ studentInfo.name }}</p>
          </div>
          <div>
            <label>Program:</label>
            <p>{{ studentInfo.program }}</p>
          </div>
          <div>
            <label>GPA:</label>
            <p>{{ studentInfo.gpa }}</p>
          </div>
        </div>
        <div v-else-if="activeTab === 'courseStatus'">
          <h2>Student Course Status</h2>
          <!-- Display student course status here -->
          <p>This section is under construction</p>
        </div>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'StudentInfo',
    data() {
      return {
        activeTab: 'info', // Default tab to display
        studentInfo: {
          name: 'John Doe',
          program: 'Computer Science',
          gpa: '3.8'
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
      }
    }
  };
  </script>

  <style scoped>

  .container {
    display: flex;
    align-items: flex-start;
  }

  .nav {
    width: 200px;
    background-color: #99CCFF;
    padding: 20px;
  }

  .nav ul {
    list-style-type: none;
    padding: 0;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

  }

  .nav li {
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

  }

  .nav li:hover {
    background-color: #77aaff;
  }

  .nav li.active {
    background-color: #6699ff;
    font-weight: bold;
  }

  .content {
    margin-left: 20px;
  }

  .content h2 {
    margin-bottom: 20px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

  }

  label {
    font-weight: bold;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

  }

  p {
    margin-top: 5px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;


  }
  </style>
