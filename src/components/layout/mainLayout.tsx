import { Button, Layout,   } from "antd";
import {  Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/features/hooks";
import { logout } from "../../redux/features/auth/authSlice";
const { Header, Content, Footer,  } = Layout;


export default function MainLayout() {
  const dispatch = useAppDispatch()
  const handleLogout = ()=>{
    dispatch(logout())
  
  }
  
  return (


    
<Layout style={{}}>
  <Sidebar/>
      <Header >
        <Button onClick={handleLogout}>LogOut</Button>
      </Header>
      <Content style={{margin: '24px 16px 0'}}>
        <div
          style={{
            padding: 24,
            minHeight: 360,
           
          }}
        >
         <Outlet/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center'  }}>
     
      </Footer>
    </Layout>
);

}
