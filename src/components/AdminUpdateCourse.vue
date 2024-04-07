<template>
    <div>
        <label>Course ID:</label>
        <input type="number" id="coursecode" v-model="courseID"/>
        <br/>
        <label>Update Course Code</label>
        <input type="text" id="coursecode" v-model="CourseInfo.code"/>
        <br/>
        <label>Update Course Title</label>
        <input type="text" id="coursecode" v-model="CourseInfo.title"/>
        <br/>
        <label>Update Requisites Of</label>
        <input type="text" id="coursecode" v-model="requisitesInput"/>
        <br/>
        <button @click="updateCourseHandler">Update</button>

        <p>{{ message }}</p>
        
    </div>

</template>

<script>


import AdminService from '@/services/AdminService'

export default {
    name: "adminUpdateCourse",
    data(){
        return {
            CourseInfo:{code: "", 
                            title:"",
                            requisitesOf:[]},
           requisitesInput: "",
           courseID: 0,
            message:""
            
        }
    },
    methods:{
        updateCourseHandler(event){
            event.preventDefault();
            const requisites = this.requisitesInput.split(",").map(requisite => requisite.trim());
            this.CourseInfo.requisitesOf = requisites;
            AdminService.updateCourse(this.CourseInfo, this.courseID)
                .then(res =>{
                    let couseDetail = res.data
                    console.log(res.data)
                    console.log(this.courseDetail)
                    this.message = "Course Updated " +  couseDetail
                })
                .catch(err =>{
                    this.CourseInfo.code = "";
                    this.CourseInfo.title  ="";
                    this.CourseInfo.requisitesOf = [];
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