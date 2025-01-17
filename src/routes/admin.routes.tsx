
import CreateStudent from "../pages/admin/CreateStudent";
import CreateAdmin from "../pages/admin/createAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import AcademicSemester from "../pages/admin/academicManagement/academicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/createAcademicSemester";

// type TRoute ={
//     path: string,
//     element: ReactNode

// }


export const adminPaths =[
    {
        name: 'Dashboard',
        path:'dashboard',
        element:'ADMIN_DASHBOARD'
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
    }
]
