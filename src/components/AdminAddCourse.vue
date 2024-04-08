<template>
    <div>
        <label>Course Code</label>
        <input type="text" id="coursecode" v-model="addCourseInfo.code"/>
        <br/>
        <label>Course Title</label>
        <input type="text" id="coursecode" v-model="addCourseInfo.title"/>
        <br/>
        <label>Requisites Of</label>
        <input type="text" id="coursecode" v-model="requisitesInput"/>
        <br/>
        <button @click="addCourseHandler">Add</button>
        <div>
            <button @click="returnHomePage">Return Home Page</button>
        </div>

        <p>{{ message }}</p>

    </div>

</template>

<script>


import AdminService from '@/services/AdminService'

export default {
    name: "adminAddCourse",
    data(){
        return {
            addCourseInfo:{code: "",
                            title:"",
                            requisitesOf:[]},
           requisitesInput: "",
            message:""

        }
    },
    methods:{
        returnHomePage(event) {
            event.preventDefault();
            this.$router.push({name:"adminHomePage"});
        },
        addCourseHandler(event){
            event.preventDefault();
            const requisites = this.requisitesInput.split(",").map(requisite => requisite.trim());
            this.addCourseInfo.requisitesOf = requisites;
            AdminService.addCourse(this.addCourseInfo)
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
        this.message = ""

    }
}

</script>

<style>

</style>
