/* eslint-disable @typescript-eslint/no-unused-vars */
import { Spin, Table, TableColumnsType, TableProps } from "antd"
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicSemester.types";
import { useState } from "react";
import { TQueryParams } from "../../../types/global";

export type TTableData = Pick<TAcademicSemester ,'name' | 'year' | 'startMonth' | 'endMonth'>



const AcademicSemester = () => {
  const [params, setParams] =useState<TQueryParams[] | undefined>(undefined)
  const { data: semesterData, isLoading } = useGetAllSemestersQuery(params)



  const tableData = semesterData?.data?.map(({ _id, name, startMonth, endMonth, year }) => ({
    key:_id,
    name,
    year,
    startMonth,
    endMonth
  }))

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Autumn',
          value: 'Autumn',
        },
        {
          text:"Summer",
          value:"Summer"
        },
        {
          text:"Fall",
          value:"Fall"
        }


      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value as string),
      width: '30%',
    },
    {
      title: 'Year',
      key: 'year',
      dataIndex: 'year', 
      filters: [
        {
          text: '2025',
          value: '2025',
        },
        {
          text: '2026',
          value: '2027',
        },
        {
          text: '2028',
          value: '2028',
        },
      ],
    },
    {
      title: 'Start Month',
      dataIndex: 'startMonth',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        }]
    }, {
      title: 'End Month',
      dataIndex: 'endMonth',

    
      width: '40%',
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





  return <Table<TTableData> columns={columns} dataSource={tableData} onChange={onChange} />
}


export default AcademicSemester
