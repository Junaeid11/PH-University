


import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/features/hooks";
import { adminPaths,  } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { sideBarItemsGenerator } from "../../utils/sideBarsItemGenarator";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const userRole ={
    admin: 'admin',
    student: 'student',
    faculty: 'faculty'
}


 const Sidebar = () => {
    const user = useAppSelector(selectCurrentUser)
    let sideBars;
    switch (user!.role) {
        case userRole.admin:
           sideBars =sideBarItemsGenerator(adminPaths, userRole.admin);
          
          //  sideBars =sideBarItemsGenerator(adminPaths, userRole.faculty );
            break
            ;
        case userRole.faculty:
          sideBars =sideBarItemsGenerator(facultyPaths, userRole.faculty);
          break
        default:
            break;
    }

   return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
    
    >
      <div className="demo-logo-vertical" />
     <div style={{color: 'white', textAlign: 'center', padding: '10px 0'}}>
     <h1 >PH-UNIVERSITY</h1>
     </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={sideBars} />
    </Sider>
   )
 }
 
 export default Sidebar
 