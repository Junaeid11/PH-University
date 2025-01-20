/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Pagination, Space, Spin, Table, TableColumnsType, TableProps } from "antd"
import {  useState } from "react";
import { TQueryParams } from "../../../types/global";
import {  useGetAllStudentQuery } from "../../../redux/features/admin/userMangement.api";
import { TStudent } from "../../../types/studentData.types";
import { Link } from "react-router-dom";

export type TTableData = Pick<TStudent , 'email' | 'id' | 'fullName' | 'contactNo'>



const StudentData = () => {
  const [params, setParams] =useState<TQueryParams[] | undefined>(undefined)
  const [page, setPage] = useState(1);
  const { data: studentData, isLoading } = useGetAllStudentQuery([
    {name:"limit", value:3},
    {name:"page", value:page},
    {name:"sort", value:"id"},
    ...params || []
  ])


const metaData = studentData?.meta

  const tableData = studentData?.data?.map(({ _id, email,id ,fullName, contactNo}) => ({
    key:_id,
    id: id,
    email,
    fullName,
    contactNo
   
  }))

  const columns: TableColumnsType<TTableData> = [
            {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
            },
            {
            title: 'Roll No',
            dataIndex: 'id',
            key: 'id',
            },
            {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            
            },{
            title: 'Contact No',
            dataIndex: 'contactNo',
            key: 'contactNo',

            },
            
    {
        title: 'Action',
        key: 'x',
        render: (item) => {
          console.log(item);
          return (
            <Space>
              <Link to={`/admin/student-data/${item.key}`}>
                <Button>Details</Button>
              </Link>
              <Button>Update</Button>
              <Button>Block</Button>
            </Space>
          );
        },
        width: '1%',
      },
  ];




  const onChange: TableProps<TTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
    if(extra.action === 'filter'){
      const queryParams : TQueryParams[] =[]
      filters.name?.forEach(item =>
        queryParams.push({name:"name", value:item})
      );
      filters.year?.forEach(item =>
        queryParams.push({name:"year", value:item})
      );
      setParams(queryParams)
    }
  
  };
if(isLoading){
  return  <div>
    <Spin size="large" />
  </div>
}


  return (
    <>
     <Table
  columns={columns}
   dataSource={tableData} 
   onChange={onChange}
    pagination={false}/>
    <Pagination current={page} onChange={(value) => setPage(value)
    } pageSize={metaData?.limit} total={metaData?.total}/>
    </>
  )
}



export default StudentData
