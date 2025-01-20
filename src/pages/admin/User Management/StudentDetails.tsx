import { useParams } from "react-router-dom"

const StudentDetails = () => {
  const { studentId } = useParams()
  return (
    <>
      <h1>Hi  this is {studentId} </h1>
    </>
    )
}
export default StudentDetails
