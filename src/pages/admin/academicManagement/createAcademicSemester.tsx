/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form"
import PHform from "../../../components/form/PHform"

import { Button, Col, Flex } from "antd"
import PHSelect from "../../../components/form/PHSelect"
import { zodResolver } from "@hookform/resolvers/zod"
import { academicSemesterSchema } from "../../../schemas/AcademicSemesterSchema"
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api"
import { toast } from "sonner"
import { TResponse } from "../../../types/global"

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

const [addAcademicSemester] = useAddAcademicSemesterMutation()


  const onSubmit: SubmitHandler<FieldValues> =async (data) => {
   const toastId =   toast.loading("Creating Academic Semester")

   const name = nameOptions.find((option)=> option.value === data.name)?.label
   const month = monthOptions[Number(data.startMonth)]?.label
   const monthEnd = monthOptions[Number(data.endMonth)]?.label


    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: month,
      endMonth:monthEnd
    }


    try{
       console.log(semesterData)
      const res= await addAcademicSemester(semesterData) as TResponse<T>
       if(res.error){
        toast.error(res.error.data.message ,{id:toastId})
       }
       else{
        toast.success("Academic Semester Created Successfully",{id:toastId})
       }

        
    }catch(err: any){
      toast.error(err.data.message ,{id:toastId})
    }
   
  }

  return (
    <Flex justify="center" align="center" >
      <Col span={10}>
        <PHform onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
          <PHSelect label="Name" name="name"options={nameOptions} disabled={false}/>
          <PHSelect label="Year" name="year" options={yearOptions} disabled={false}/>
          <PHSelect label="StartMonth" name="startMonth"options={monthOptions} disabled={false}/>
          <PHSelect label="EndMonth" name="endMonth"options={monthOptions}disabled={false} />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  )
}

export default CreateAcademicSemester
