
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form"
import PHform from "../../../components/form/PHform"
import { Button, Col, Flex } from "antd"
import PHSelect from "../../../components/form/PHSelect"
import { toast } from "sonner"
import PHInput from "../../../components/form/PHInput"
import { useAddCourseMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api"
import { TResponse } from "../../../types/global"


const CreateCourse = () => {
    const [createCourse] = useAddCourseMutation()
  const {data: courses} = useGetAllCoursesQuery(undefined)




 


    const preRequisiteCoursesOptions = courses?.data?.map((item: any) => ({
        value: item._id,
        label: item.title
    })



    )

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Course creating...")
        const CourseData = {
            ...data,
           isDeleted: false,
           credits : Number(data.credits),
            code: Number(data.code),
           preRequisiteCourses :data.preRequisiteCourses ? data.preRequisiteCourses?.map((item: any) => ({
            course : item,
            isDeleted: false,
            

           })) : [],
            
        }
        console.log(CourseData)

        try{
          const res= await createCourse(CourseData) as TResponse<any>
           if(res.error){
            toast.error(res.error.data.message ,{id:toastId})
           }
           else{
            toast.success("Course created",{id:toastId})
           }


        }catch(err: any){
          toast.error(err.data.message ,{id:toastId})
        }

    }

    return (
        <Flex justify="center" align="center" >
            <Col span={10}>
                <PHform onSubmit={onSubmit} >

                    <PHInput type="text" label="Title" name="title" />
                    <PHInput type="text" label="Prefix" name="prefix" />
                    <PHInput type="text" label="Code" name="code" />
                    <PHInput type="text" label="Credits" name="credits" />
                    <PHSelect
                    mode="multiple"
                    name="preRequisiteCourses"
                    label="Pre Requisite Courses"
                    options={preRequisiteCoursesOptions}
                    
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHform>
            </Col>
        </Flex>
    )
}


export default CreateCourse
