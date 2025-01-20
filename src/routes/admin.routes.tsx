
import CreateStudent from "../pages/admin/User Management/CreateStudent";
import CreateAdmin from "../pages/admin/User Management/createAdmin";
import CreateFaculty from "../pages/admin/User Management/CreateFaculty";
import AcademicSemester from "../pages/admin/academicManagement/academicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/createAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentData from "../pages/admin/User Management/studentData";
import StudentDetails from "../pages/admin/User Management/StudentDetails";
import SemesterRegistration from "../pages/admin/CourseManagement/semesterRegistration";
import RegisteredSemesters from "../pages/admin/CourseManagement/RegisteredSemesters";
import CreateCourse from "../pages/admin/CourseManagement/CreateCourse";
import Courses from "../pages/admin/CourseManagement/Courses";

// type TRoute ={
//     path: string,
//     element: ReactNode

// }


export const adminPaths =[
    {
        name: 'Dashboard',
        path:'dashboard',
        element:<AdminDashboard/>
    },{
        name: "Academic Management",
        children:[
            {
                name:"Create Academic Semester",
                path:'create-academic-semesters',
                element:<CreateAcademicSemester/>
            },
            {
                name:"Academic Semester",
                path:'academic-semesters',
                element:<AcademicSemester/>
            },
        ]

    },
    {
        name:"User Management",
        children:[
            {
                name: 'Students',
                path:'student-data',
                element:<StudentData/>
            },
            {
                
                path:'student-data/:studentId',
                element:<StudentDetails/>
            },
            {
                name: 'Create Admin',
                path:'create-admin',
                element:<CreateAdmin/>
            },
            {
                name: 'Create faculty',
                path:'create-faculty',
                element:<CreateFaculty/>
            },
            {
                name: 'Create Student',
                path:'create-student',
                element:<CreateStudent/>
            }
        ]
    },
    {
        name: 'Course Management',
        children:[
            {
                name: 'Semester Registration',
                path:'semester-registrations',
                element:<SemesterRegistration/>
            },
            {
                name: 'Registered Semesters',
                path:'registered-semesters',
                element:<RegisteredSemesters/>
            },
            {
                name: 'Courses',
                path:'courses',
                element:<Courses/>
            },
            {
                name: 'Create Course',
                path:'create-course',
                element:<CreateCourse/>
            },
        ]
    }
]
