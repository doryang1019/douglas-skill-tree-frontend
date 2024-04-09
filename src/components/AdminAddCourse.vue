<template>
    <div>
        <label>Course Code</label>
        <input type="text" id="coursecode" v-model="addCourseInfo.code"/>
        <br/>
        <label>Course Title</label>
        <input type="text" id="coursecode" v-model="addCourseInfo.title"/>
        <br/>
        <label>Requisites Of</label>
        <select v-model="addCourseInfo.requisitesOf" multiple>
            <option v-for=" course in courses" :key="course.id" :value="course.id" :code="course.code" :title="course.title"> {{ course.title }}</option>
        </select>
        <!-- <input type="text" id="coursecode" v-model="requisitesInput"/> -->
        <br/>
        <button @click="addCourseHandler">Add</button>
        <div>
            <button @click="returnHomePage">Return Home Page</button>
        </div>

        <p>{{ message }}</p>

    </div>

</template>

<script>


import CourseService from '@/services/CourseService'

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

        }
    },
    methods:{
        returnHomePage(event) {
            event.preventDefault();
            this.$router.push({name:"adminHomePage"});
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
            console.log("reqreq" + this.addCourseInfo.requisitesOf);
            // const requisites = this.requisitesInput.split(",").map(requisite => requisite.trim());
            CourseService.addCourse(this.addCourseInfo)
                .then(res =>{
                    let couseDetail = res.data
                    console.log(res.data)
                    console.log(this.courseDetail)
                    this.message = "Course added \n" +  JSON.stringify(couseDetail);
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

    }
}

</script>

<style>

</style>
