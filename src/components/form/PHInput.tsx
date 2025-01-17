import { Form, Input } from "antd"
import { Controller,  } from "react-hook-form"


type TInput ={
    type: string,
    name: string,
    label: string
}

const PHInput = ({ type, name, label }: TInput) => {
    return (
        <>
        <Controller
         name={name} render={({field}) =>
         <Form.Item label={label}>
            <Input {...field} type={type} />
         </Form.Item> }/>
    
        </>
    )
}
export default PHInput