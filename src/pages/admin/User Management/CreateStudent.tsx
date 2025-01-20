import { Controller, FieldValues, SubmitHandler } from "react-hook-form"
import PHform from "../../../components/form/PHform"
import PHInput from "../../../components/form/PHInput"
import { Button, Col, Divider, Form, Input, Row } from "antd"
import PHDatePicker from "../../../components/form/datePicker"
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api"
import PHSelect from "../../../components/form/PHSelect"
import { useAddStudentMutation } from "../../../redux/features/admin/userMangement.api"

const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "I am ",
      middleName: "Student",
      lastName: "Number 1"
    },
    gender: "male",
    dateOfBirth: "1990-01-01",
    bloodGroup: "A+",
    email: "student2@gmail.com",
    contactNo: "1235678",
    emergencyContactNo: "987-654-3210",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",
    guardian: {
      fatherName: "James Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "111-222-3333",
      motherName: "Mary Doe",
      motherOccupation: "Teacher",
      motherContactNo: "444-555-6666"
    },
    localGuardian: {
      name: "Alice Johnson",
      occupation: "Doctor",
      contactNo: "777-888-9999",
      address: "789 Pine St, Villageton"
    },
    admissionSemester: "65b0104110b74fcbd7a25d92",
    academicDepartment: "65b00fb010b74fcbd7a25d8e"
  }
}
const studentDefaultValues = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "Number 1"
  },
  gender: "male",
  bloodGroup: "A+",
  email: "studentaaaaaaaaaa211@gmail.com",
  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",
  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666"
  },
  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton"
  },
   academicDepartment: "676e9f94c285b1b3aee19a84"
}

const CreateStudent = () => {
  const [addStudent, {data,error}] = useAddStudentMutation()
  console.log(data, error)
const {data: sData, isLoading: sLoading} = useGetAllSemestersQuery(undefined)

const semesterOptions = sData?.data?.map((item)=>({
  value:item._id,
  label:`${item.name} ${item.year}`,



}))



  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: "student123",
      student: data
    }
    const formData = new FormData()
    formData.append("data", JSON.stringify(studentData))
    formData.append("file", data.image)
    console.log("file", data.image)
    addStudent(formData)

    //! this is for development purpose only
    console.log(Object.fromEntries(formData))
  }

  return (
    <Row>
      <Col span={24}>
        <PHform onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="gender" name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHDatePicker name="dateOfBirth" label="Date Of birth" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="BloodGroup" name="bloodGroup" label="Blood Group" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
             <Controller name="image" render={({field: {onChange,value,...field}})=>
             <Form.Item label="Image">
               <Input type="file" 
               value={value?.fileName} {...field} onChange={(e)=>{
                 onChange(e.target.files?.[0])
               }}/>
              </Form.Item>
              } />
            </Col>
            
          </Row>
          <Divider>Contact Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="email" name="email" label="Email" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="contactNo" label="Contact Number" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="emergencyContactNo" label="Emergency Contact Number" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="presentAddress" label="Present Address" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="permanentAddress" label="Permanent Address" />
            </Col>
          </Row>
          <Divider>Guardian Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="guardian.fatherName" label="Father's Name" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="guardian.fatherOccupation" label="Father's Occupation" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="guardian.fatherContactNo" label="Father's Contact Number" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="guardian.motherName" label="Mother's Name" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="guardian.motherOccupation" label="Mother's Occupation" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="guardian.motherContactNo" label="Mother's Contact Number" />
            </Col>
          </Row>
          <Divider>Local Guardian Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="localGuardian.name" label="Local Guardian's Name" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="localGuardian.occupation" label="Local Guardian's Occupation" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="localGuardian.contactNo" label="Local Guardian's Contact Number" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="localGuardian.address" label="Local Guardian's Address" />
            </Col>
            <Divider>Academic Information</Divider>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
           <PHSelect 
           
           options={semesterOptions}
           disabled={sLoading}
           name="admissionSemester" label="Admission Semester"  />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
            {/* <PHSelect 

           disabled={sLoading}
           name="admissionDepartment" label="Admission Department"  /> */}


           <PHInput type="text" name="academicDepartment" label="Academic Department" />
            </Col>
            
          </Row>
          <Button type="primary" htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Row>
  )
}

export default CreateStudent
