<template>
    <div>
        <label>Course ID:</label>
        <input type="number" id="coursecode" v-model="courseID"/>
        <br/>
        <button @click="deleteCourseHandler">Delete</button>
        <p>{{ message }}</p>

    </div>

</template>

<script>

import CourseService from '@/services/CourseService'

export default {
    name: "adminDeleteCourse",
    data(){
        return {
           courseID: 0,
            message:""

        }
    },
    methods:{
        deleteCourseHandler(event){
            event.preventDefault();
            console.log(this.courseID)
            CourseService.deleteCourse(this.courseID)
                .then(()=>{
                    this.message ="Course Deleted";
                })
                .catch(err =>{
                    this.courseID = 0;

                    this.message = "Forbidden Delete Action";
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
