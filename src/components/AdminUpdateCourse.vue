<template>
    <div class="container">
        <div class="header">
            <h2 class="title">Update Course</h2>
        </div>

        <div class="info">
            <label>Course Code</label>
            <select class="searchbar-list-code" v-model="selectedCourse" @change="filterRequisites()">
                <option v-for="course in courses" :key="course.id" :value="course">{{ course.code + "-" + course.title }}</option>
            </select>
        </div>
        <div class="info">
            <label>Course Title</label>
            <input type="text" class="searchbar" v-model="updateCourseTitle" :placeholder="changePlaceHolder()" />
        </div>
        <div class="info">
            <label>Requisites Of</label>
            <select class="searchbar-list" v-model="selectedRequisites" multiple>
                <option v-for="course in requisiteCourses" :key="course.id" :value="course.id">{{ course.title }}</option>
            </select>
        </div>
        <div class="button-container">
            <button class="searchbtn" @click="updateCourseHandler">Update Course</button>
            <button class="searchbtn" @click="returnHomePage">Return Home Page</button>
        </div>

        <p class="text-f">{{ message }}</p>
    </div>
</template>


<script>

import CourseService from '@/services/CourseService'

export default {
    name: "adminUpdateCourse",
    data() {
        return {
            selectedCourse:  {},
            updateCourseTitle: "",
            selectedRequisites: [],
            message: "",
            courses: [],
            requisiteCourses: []
        }
    },
    methods: {
        filterRequisites() {
            CourseService.getUpperCourse(this.selectedCourse.id)
            .then(res => {
                this.requisiteCourses = res.data;
            })
            .catch(err => {
                console.log(err);
                this.requisiteCourses = [];
            });
            this.requisiteCourses;
        },
        changePlaceHolder() {
            if(this.selectedCourse.title) {
                return this.selectedCourse.title;
            } else {
                return "please choose a course";
            }
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
        updateCourseHandler(event) {
            event.preventDefault();
            if(this.selectedCourse && this.selectedCourse.id) {
                console.log(this.selectedCourse);
            const courseInfo = {
                title: this.updateCourseTitle,
                requisitesOf: this.selectedRequisites,
                code: this.selectedCourse.code,
            };
            console.log(courseInfo);
            CourseService.updateCourse(courseInfo, this.selectedCourse.id)
                .then(res => {
                    let couseDetail = res.data;
                    console.log(res.data);
                    console.log(this.courseDetail);
                    this.message = "Course Updated " + couseDetail;
                })
                .catch(err => {
                    this.selectedCourse = {};
                    this.updateCourseTitle = "";
                    this.selectedRequisites = [];
                    console.log(err);
                })
            }


        },
        returnHomePage(event) {
            event.preventDefault();
            this.$router.push({ name: "adminHomePage" });
        }
    },
    mounted() {
        this.message = "";
        this.geAllCourses();
    }
}

</script>

<style scoped>
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
}

.info {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 20px;
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
.searchbar-list-code {
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
    height: 350px;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    font-size: 16px;
    outline: none;
    margin-bottom: 10px;
}

.text-f {
    margin-bottom: 20px;
    text-align: center;
}

.button-container {
    text-align: center;
}
</style>
