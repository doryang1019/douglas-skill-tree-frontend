<template>
    <div>
        <label>Course ID:</label>
        <input type="number" id="coursecode" v-model="courseID"/>
        <label>User ID:</label>
        <input type="number" id="coursecode" v-model="userID"/>
        <br/>
        <button @click="searchCourseStudentStat">Search</button>
        <p>{{ message }}</p>

        <div v-if="courseInfo">
            <h2>Course Information</h2>
            <h3>{{ courseInfo.title }}</h3>
            <p>Code: {{ courseInfo.code }}</p>
            <p>Status:</p>
            <ul>
                <li v-if="courseInfo.status.done">Done: {{ courseInfo.status.done }}</li>
                <li v-if="courseInfo.status.taken">Taken:{{ courseInfo.status.taken }}</li>
            </ul>
            <!-- <p v-if="courseInfo.requisitesOf.length > 0">Requisites of:</p>
            <ul v-if="courseInfo.requisitesOf.length > 0">
                <li v-for="requisite in courseInfo.requisitesOf" :key="requisite.id">
                    {{ requisite.title }} ({{ requisite.code }})
                </li>
            </ul> -->
        </div>

    </div>

</template>

<script>

import CourseService from '@/services/CourseService'

export default {
    name: "findCourseOfStudent",
    data(){
        return {
           courseID: 0,
           userID:0,
           courseInfo:null,
            message:""

        }
    },
    methods:{
        searchCourseStudentStat(event){
            event.preventDefault();
            CourseService.getCourseUserStatus(this.courseID, this.userID)
                .then(res=>{
                    this.courseInfo = res.data
                    this.message ="Finding Suceess";
                })
                .catch(err =>{
                    this.courseID = 0;

                    this.message = "Error Occurs";
                    console.log(err);
                })
        },
    },
    mounted(){
        this.message = ""

    }
}

</script>

<style>

</style>
