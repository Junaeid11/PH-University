
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form"
import PHform from "../../../components/form/PHform"

import { Button, Col, Flex } from "antd"
import PHSelect from "../../../components/form/PHSelect"
import {  useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api"
import { toast } from "sonner"
import PHDatePicker from "../../../components/form/datePicker"
import PHInput from "../../../components/form/PHInput"
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api"
import { TResponse } from "../../../types/global"

const semesterStatus = [
    { value: "UPCOMING", label: "Upcoming" },
    { value: "ONGOING", label: "Ongoing" },
    { value: "ENDED", label: "Ended" },

]




const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation()
    const { data: academicSemester } = useGetAllSemestersQuery([
        { name: 'sort', value: 'year' },
    ])


    const academicSemesterOptions = academicSemester?.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`
    })



    )

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating Academic Registration")
        const semesterData = {
            ...data,
            minCredit: Number(data.minCredit),
            maxCredit: Number(data.maxCredit)
            
        }
        console.log(semesterData)

        try{
          const res= await addSemester(semesterData) as TResponse<any>
           if(res.error){
            toast.error(res.error.data.message ,{id:toastId})
           }
           else{
            toast.success("Academic Semester Registration created",{id:toastId})
           }


        }catch(err: any){
          toast.error(err.data.message ,{id:toastId})
        }

    }

    return (
        <Flex justify="center" align="center" >
            <Col span={10}>
                <PHform onSubmit={onSubmit} >
                    <PHSelect label="Academic Semester" name="academicSemester" options={academicSemesterOptions} disabled={false} />
                    <PHSelect label="Status" name="status" options={semesterStatus} disabled={false} />
                    <PHDatePicker label="Start Date" name="startDate" />
                    <PHDatePicker label="End Date" name="endDate" />
                    <PHInput type="text" label="Max Credit" name="maxCredit" />
                    <PHInput type="text" label="Min Credit" name="minCredit" />
                    <Button htmlType="submit">Submit</Button>
                </PHform>
            </Col>
        </Flex>
    )
}


export default SemesterRegistration
