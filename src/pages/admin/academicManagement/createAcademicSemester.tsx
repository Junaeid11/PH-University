import { FieldValues, SubmitHandler } from "react-hook-form"
import PHform from "../../../components/form/PHform"

import { Button, Col, Flex } from "antd"
import PHSelect from "../../../components/form/PHSelect"
import { zodResolver } from "@hookform/resolvers/zod"
import { academicSemesterSchema } from "../../../schemas/AcademicSemesterSchema"

const nameOptions =[
  {value:"01", label:"Autumn"},
  {value:"02", label:"Summer"},
  {value:"03", label:"Fall"},
]
const monthOptions =[
  {value:"01", label:"January"},
  {value:"02", label:"February"},
  {value:"03", label:"March"},
  {value:"04", label:"April"},
  {value:"05", label:"May"},
  {value:"06", label:"June"},
  {value:"07", label:"July"},
  {value:"08", label:"August"},
  {value:"09", label:"September"},
  {value:"10", label:"October"},
  {value:"11", label:"November"},
  {value:"12", label:"December"},
]
const currentYear = new Date().getFullYear()
const yearOptions =[0,1,2,3,4,5].map((year)=>{
  return {value:String(currentYear+ year), label:String(currentYear+ year)}
})



const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {

   const name = nameOptions[Number(data.name)]?.label
   const month = monthOptions[Number(data.startMonth)]?.label
   const monthEnd = monthOptions[Number(data.endMonth)]?.label


    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: month,
      endMonth:monthEnd
    }
    console.log(semesterData)
  }

  return (
    <Flex justify="center" align="center" >
      <Col span={10}>
        <PHform onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
          <PHSelect label="Name" name="name"options={nameOptions}/>
          <PHSelect label="Year" name="year" options={yearOptions}/>
          <PHSelect label="StartMonth" name="startMonth"options={monthOptions}/>
          <PHSelect label="EndMonth" name="endMonth"options={monthOptions}/>
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  )
}

export default CreateAcademicSemester
