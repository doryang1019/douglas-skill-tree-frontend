<template>
    <div class="container">
        <div class="header">
            <h2 class="title">Add Course</h2>
        </div>
        <div class="info">
            <label>Course Code</label>
            <input type="text" class="searchbar" v-model="addCourseInfo.code" placeholder="please enter course code"/>
        </div>
        <div class="info">
            <label>Course Title</label>
            <input type="text" class="searchbar" v-model="addCourseInfo.title" placeholder="please enter course title"/>
        </div>
        <div class="info">
            <label>Program Name</label>
            <select class="searchbar" v-model="program">
            <option v-for="(programOption) in programOptions" :key="programOption.id" :stream="programOption.stream"
                :value="programOption.id">{{ programOption.description }}</option>
             </select>
        </div>
        <div class="info">
            <label>Requisites Of</label>
            <select class="searchbar-list" v-model="addCourseInfo.requisitesOf" multiple>
                <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.title }}</option>
            </select>
        </div>
        <div class="button-container">
            <button class="searchbtn home" @click="returnHomePage">Return Home Page</button>
            <button class="searchbtn add" @click="addCourseHandler">Add Course</button>
        </div>

        <!-- <p class="text-f">{{ message }}</p> -->
        <div v-if="message" class="searchbar-w">
            <h4>Successfully Added!</h4>
            <h5>Course Id: {{ message.id }}</h5>
            <h5>Course Code: {{ message.code }}</h5>
            <h5>Course title: {{ message.title}}</h5>
        </div>
        <!-- // Course added {"id":8,"code":"CSIS444","title":"Test1","requisitesOf":[6]} -->
    </div>
</template>

<script>


import CourseService from '@/services/CourseService'
import ProgramService from '@/services/ProgramService';
export default {
    name: "adminAddCourse",
    data(){
        return {
            addCourseInfo:{code: "",
                            title:"",
                            requisitesOf:[]},
           requisitesInput: "",
            message:"",
            courses: [],
            program: "",
            programOptions: [],

        }
    },
    methods:{
        returnHomePage(event) {
            event.preventDefault();
            this.$router.push({name:"adminHomePage"});
        },
        getPrograms() {
            ProgramService.getAllPrograms()
                .then(response => {
                    this.programOptions = response.data;
                })
                .catch(error => {
                    console.error("Error fetching program options:", error);
                });
        },
        geAllCourses() {
            CourseService.getUnformatCourse()
            .then(res => {
                this.courses = res.data;
            }).catch(err => {
                this.courses = [];
                console.log(err);
            })
        },
        addCourseHandler(event){
            event.preventDefault();
            CourseService.addCourse({course: this.addCourseInfo, programId: this.program})
                .then(res =>{
                    let couseDetail = res.data
                    this.message = couseDetail;
                    // Course added {"id":8,"code":"CSIS444","title":"Test1","requisitesOf":[6]}
                })
                .catch(err =>{
                    this.addCourseInfo.code = "";
                    this.addCourseInfo.title  ="";
                    this.addCourseInfo.requisitesOf = [];
                    // this.message = err.response.data.message;
                    console.log(err);
                })

        },
    },
    mounted(){
        this.message = "";
        this.geAllCourses();
        this.getPrograms();

    }
}

</script>



<style scoped>
@import '../css/message.css';
@import '../css/button.css';
.searchbtn.home {
    margin-left: -100px;
    margin-right: 500px;

}

.container {
    padding: 20px;
    width: 70%;
    align-content: center;
  justify-content: center;
  margin: auto;
  position: relative;
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
