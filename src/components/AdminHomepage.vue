<template>
    <div>
        <h1>Welcome</h1>
        <button>
        <router-link to="/" @click="logout">Logout</router-link>
        </button>
        <button @click="btnAllCoursesHandeler">All courses</button>
        <button>
            <router-link to="/admin/add" >Add Course</router-link>
        </button>
        <button>
            <router-link to="/admin/update" >Update Course</router-link>
        </button>
        <button>
            <router-link to="/admin/delete">Delete Course</router-link>
        </button>
        <button>
            <router-link to="/admin/findCSS">Find Course Status Of Student</router-link>
        </button>
       
        
        
        <div v-if="showCourses&&courses">
            <h2>All Courses</h2>
            <div v-for="course in courses" :key="course.id">
                <h3>{{ course.title }}</h3>
                <p>Code: {{ course.code }}</p>
                <p>Status: {{ course.status }}</p>
                <p v-if="course.requisitesOf.length > 0">Requisites of:</p>
                <ul v-if="course.requisitesOf.length > 0">
                    <li v-for="requisite in course.requisitesOf" :key="requisite.id">
                        {{ requisite.title }} ({{ requisite.code }})
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>

import AdminService from '@/services/AdminService';



export default{
    name:"adminHomePage",

    data(){
        return {
            courses:null,
            showCourses: false,
            
        }
    },
    methods:{
        logout(event){
            event.preventDefault();
            localStorage.removeItem('uid');
            localStorage.removeItem('uName');
        },

        retreiveUserInfo(){
            // const uid =localStorage.getItem('uid');
            // console.log(uid)
            // const uName = localStorage.getItem('uName')
            // console.log(uName)

            AdminService.getAllCourse()
                .then(res=>{
                    this.courses = res.data
                    console.log(this.courses)
                })
                .catch(err=>{
                    console.log(err.message)
                })

        },
        btnAllCoursesHandeler(){
            this.showCourses = true
            AdminService.getAllCourse()
                .then(res=>{
                    this.courses = res.data
                    console.log(this.courses)
                })
                .catch(err=>{
                    console.log(err.message)
                })
            
        }
    },
    mounted(){
        //this.retreiveUserInfo();
        
        
    }

}
</script>

<style>
</style>