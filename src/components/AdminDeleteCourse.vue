<template>
    <div class="container">
        <div class="header">
            <h2 class="title">Delete Course</h2>
        </div>
        <div class="info">
            <label>Course Code - Course Title</label>
            <select class="searchbar-list" v-model="courseID">
                <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.code + "-"  +course.title }}</option>
            </select>
        </div>
        <div class="button-container">
            <button class="searchbtn" @click="deleteCourseHandler">Delete Course</button>
            <button class="searchbtn" @click="returnHomePage">Return Home Page</button>
        </div>

        <div v-if="message" class="searchbar-w">
            <h4>Successfully Deleted!</h4>
        </div>
    </div>
</template>

<script>

import CourseService from '@/services/CourseService'

export default {
    name: "adminDeleteCourse",
    data(){
        return {
           courseID: 0,
            message:"",
            courses: [],

        }
    },
    methods:{
        geAllCourses() {
            CourseService.getUnformatCourse()
                .then(res => {
                    this.courses = res.data;
                    console.log(this.courses[0])
                }).catch(err => {
                    this.courses = [];
                    console.log(err);
                })
        },
        deleteCourseHandler(event){
            event.preventDefault();
            console.log(this.courseID)
            CourseService.deleteCourse(this.courseID)
                .then(()=>{
                    this.message ="Course Deleted";
                })
                .catch(err =>{
                    this.courseID = 0;

                    this.message = "Forbidden Delete Action\nThis Course Has Child Course";
                    console.log(err);
                })
        },
        returnHomePage(event) {
            event.preventDefault();
            this.$router.push({ name: "adminHomePage" });
        }
    },
    mounted(){
        this.message = "";
        this.geAllCourses();

    }
}

</script>
<style scoped>
@import '../css/message.css';
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
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 20px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

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
    width: 350px;
    height: 40px;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    font-size: 16px;
    outline: none;
    margin-bottom: 10px;
}
.searchbar-list {
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

.text-f {
    margin-bottom: 20px;
    text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

.button-container {
    text-align: center;
}
</style>

