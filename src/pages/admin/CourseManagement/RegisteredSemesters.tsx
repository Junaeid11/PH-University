/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dropdown, Space, Spin, Table, TableColumnsType, TableProps, Tag } from "antd"

import { useState } from "react";
import { TQueryParams } from "../../../types/global";
import { useRegisteredSemestersQuery, useUpdateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { TSemester } from "../../../types/courseManegement.type";

export type TTableData = Pick<TSemester, 'academicSemester' | 'startDate' | 'endDate'>


const items =[
  {
    value: 'UPCOMING',
    label: 'Upcoming',
    key: 'UPCOMING'
  },
  {
    value: 'ONGOING',
    label: 'ONGOING',
    key: 'ONGOING'
  },
  {
    value: 'ENDED',
    label: 'ENDED',
    key: 'ENDED'
  }
]




const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState(' ')
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined)
  const [updateSemester] = useUpdateSemesterRegistrationMutation()




  const { data: semesterData, isLoading } = useRegisteredSemestersQuery(params)
  console.log(semesterData)


  const handleStatus = (data: any)=>{
    const updateData = {
      id: semesterId,
      data: {
        status: data.key
      }
    };
    updateSemester(updateData)
  }

  const menuProps ={
    items, onClick: handleStatus
  }
  





  const tableData = semesterData?.data?.map(({ _id,academicSemester, endDate, startDate, status }) => ({
    key: _id,
    name: academicSemester.name ,
    status,
    endDate: moment(new Date(endDate)).format('MMMM'),
    startDate:  moment(new Date(startDate)).format('MMMM')
  }))

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        if(status === 'UPCOMING'){
          return <Tag style={{color: 'green'}}>{status}</Tag>
      }
      else if(status === 'ONGOING'){
        return <Tag style={{color: 'blue'}}>{status}</Tag>
    }
    else{
      return <Tag style={{color: 'red'}}>{status}</Tag>
    }
  }
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
    }, {
      title: 'End Date',
      dataIndex: 'endDate',


      width: '40%',
    },
             
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={['click']}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
         
          </Dropdown>
        );
      },
      width: '1%',
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
      setParams(queryParams)
    }

  };
  if (isLoading) {
    return <div>
      <Spin size="large" />
    </div>
  }





  return <Table<TTableData> columns={columns} dataSource={tableData} onChange={onChange} />
}


export default RegisteredSemesters
