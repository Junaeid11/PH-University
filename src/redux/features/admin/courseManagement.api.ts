

import { TSemester } from "../../../types/courseManegement.type";
import { TQueryParams, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registeredSemesters: builder.query({
            query: (args) => {

                const params = new URLSearchParams()
                if(args){
                    args.forEach((item:TQueryParams) => {
                        params.append(item.name, item.value as string)
                        
                    });
                }



                return {
                    url: '/semester-registrations',
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['Semester'],
            transformResponse: (response: TResponseRedux<TSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }

        }),
        addRegisteredSemester: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: 'POST',
                body: data
            })
        }),
        updateSemesterRegistration: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: 'PATCH',
                body: args.data
            }),
            invalidatesTags: ['Semester', ]
        }),
        getAllCourses: builder.query({
            query: (args) => {

                const params = new URLSearchParams()
                if(args){
                    args.forEach((item:TQueryParams) => {
                        params.append(item.name, item.value as string)
                        
                    });
                }



                return {
                    url: '/courses',
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['courses'],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }

        }),
        addCourse: builder.mutation({
            query: (data) => ({
                url: '/courses/create-course',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['courses']
        }),
       
    })

})

export const {useRegisteredSemestersQuery ,  useAddRegisteredSemesterMutation, useUpdateSemesterRegistrationMutation, useGetAllCoursesQuery , useAddCourseMutation} = courseManagementApi