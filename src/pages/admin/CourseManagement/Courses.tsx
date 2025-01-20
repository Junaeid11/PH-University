/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dropdown, Modal, Space, Spin, Table, TableColumnsType, TableProps, Tag } from "antd"

import { useState } from "react";
import { TQueryParams } from "../../../types/global";
import { useAddCourseMutation, useGetAllCoursesQuery, useRegisteredSemestersQuery, useUpdateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { TSemester } from "../../../types/courseManegement.type";

export type TTableData = Pick<TSemester, 'academicSemester' | 'startDate' | 'endDate'>




const Courses = () => {
    const [ setParams] = useState<TQueryParams[] | undefined>(undefined)
  const { data: CourseData, isLoading } = useGetAllCoursesQuery(undefined)
  console.log(CourseData)


//   const handleStatus = (data: any)=>{
//     const updateData = {
//       id: semesterId,
//       data: {
//         status: data.key
//       }
//     };
//     updateSemester(updateData)
//   }




  const tableData = CourseData?.data?.map(({ title, code }) => ({
   title,
   code
  }))

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
   
    {
      title: 'Code',
      dataIndex: 'code',
    }, 
             
    {
      title: 'Action',
      key: 'x',
      render: (data) => {
         return <AddFacultyModal data={data}/>
      },
    },
  ];




  const onChange: TableProps<TTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
    if (extra.action === 'filter') {
      const queryParams: TQueryParams[] = []
      filters.name?.forEach(item =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach(item =>
        queryParams.push({ name: "year", value: item })
      );
    //  setParams(queryParams)
    }

  };
  if (isLoading) {
    return <div>
      <Spin size="large" />
    </div>
  }





  return <Table<TTableData> columns={columns} dataSource={tableData} onChange={onChange} />

}


const AddFacultyModal =({data}) =>{
    console.log(data.key)
    

       const [isModalOpen, setIsModalOpen] = useState()
       const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return (
        <>
          <Button type="primary" onClick={showModal}>
           Add Faculty
          </Button>
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}> 
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </>
      );
    }
    


export default Courses
