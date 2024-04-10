<template>
    <div class="container">
        <div class="header">
            <h1 class="title">Welcome to Douglas Skill Tree</h1>
            <div class="info">
                <span>User Id: {{ this.userId }}</span>
                <span>User Name: {{ this.userName }}</span>
                <span>Admin: {{ isAdmin ? 'Yes' : 'No' }}</span>
                <span v-if="!isAdmin">Program: {{ this.userProgram ? this.userProgram.description : "" }}</span>
            </div>
        </div>
        <nav class="nav-bar">
            <button @click="btnAllCoursesHandler">All courses</button>
            <button v-if="isAdmin" @click="goToAddCourse">Add Course</button>
            <button v-if="isAdmin" @click="goToUpdateCourse">Update Course</button>
            <button v-if="isAdmin" @click="goToDeleteCourse">Delete Course</button>
            <button v-if="isAdmin" @click="goToAddUser">Add Admin/User</button>
            <button @click="goToStudentInfo">My Information</button>
            <button @click="goToLoginPage">Logout</button>
        </nav>
        <div v-if="showCourses && courses" class="course-container">
            <div class="search-container">
                <input class="searchbar" type="text" v-model="courseKeyword" placeholder="Please enter course code or course name">
                <button class="searchbtn" @click="findCourseByKeyword"> Search Course</button>
            </div>
            <div v-for="course in courses" :key="course.id" class="course-card" :style="{ backgroundColor: course.status.taken ? course.status.done ? '#FBF9F1' : '#FFF8E3' : ''}">
                <h3>{{ course.title }}</h3>
                <p><strong>Code: {{ course.code }}</strong></p>
                <p v-if="!isAdmin"><strong>Status: {{ course.status ? course.status.taken ? course.status.done ? "Finished  &#9873;" : "Progressing  &#9872;" : "Not Taken" :  "NA"}}</strong></p>
                <div v-if="course.requisitesOf.length > 0">
                    <p><strong>Requisites of:</strong></p>
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
import CourseService from '@/services/CourseService';

export default {
    name: "adminHomePage",
    components: {
        RecursiveRequisite
    },
    data() {
        return {
            courses: null,
            showCourses: false,
            isAdmin: false,
            userName: "",
            userId: "",
            userProgram: null,
            courseKeyword: "",
        }
    },
    methods: {
        logout(event) {
            event.preventDefault();
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
        },
        retrieveCourses() {
            // console.log("this.userProgram.id" + this.userProgram.id);
            CourseService.getAllCourse(this.userProgram ? this.userProgram.id : null, this.userId)
                .then(res => {
                    this.courses = res.data;
                })
                .catch(err => {
                    console.error("Error fetching courses:", err);
                });
        },
        findCourseByKeyword() {
            CourseService.getCourseByKey(this.courseKeyword, this.userProgram ? this.userProgram.id : null, this.userId)
            .then(res => {
                this.courses = res.data;
            })
            .catch(err => {
                console.error("error get courses", err);
            })
        },
        btnAllCoursesHandler() {
            this.showCourses = true;
            this.retrieveCourses();
        },
        goToAddCourse() {
            this.$router.push({ name: "addCourse" });
        },
        goToUpdateCourse() {
            this.$router.push({ name: "updateCourse" });
        },
        goToDeleteCourse() {
            this.$router.push({ name: "deleteCourse" });
        },
        goToAddUser() {
            this.$router.push({ name: "addUser" });
        },
        goToStudentInfo() {
            this.$router.push({ name: "studentInfo" });
        },
        goToLoginPage() {
            this.$router.push({ name: "userLogin" });
        }
    },
    mounted() {
        console.log("isAdmin: " + localStorage.getItem('isAdmin'));
        this.isAdmin = localStorage.getItem('isAdmin').toString() === "true" ? true : false;
        this.userId = localStorage.getItem('userId');
        this.userName = localStorage.getItem('userName');
        this.userProgram = JSON.parse(localStorage.getItem('program'));
        this.btnAllCoursesHandler();
        // console.log("userprogram" + this.userProgram.id)
    }
};
</script>

<style scoped>
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
}

.searchbtn:hover {
    background-color: #d3d4cc;
}

.search-container {
    text-align: center;
}

.searchbar {
    width: 350px;
    height: 40px;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    font-size: 16px;
    outline: none;
    margin-bottom: 10px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.header {
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  border: 2px solid #000;
  border-radius: 5%;
  padding: 10px;
  text-align: center;
  margin-bottom: 10px;
}

.title {
  font-size: 24px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  margin-bottom: 10px;
}

.info {
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.container {
    padding: 20px;
}

.text-f {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-bottom: 20px;
    text-align: center;
}

.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.nav-bar button,
.nav-bar a {
    flex: 1;
    margin-right: 10px;
    padding: 8px 0;
    background-color: #b7b1a5;
    color: #080710;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.nav-bar button:last-child,
.nav-bar a:last-child {
    margin-right: 0;
}

.nav-bar button:hover,
.nav-bar a:hover {
    background-color: #cac3bb;
}

.course-container {
    margin-top: 20px;
}

.course-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}
</style>
