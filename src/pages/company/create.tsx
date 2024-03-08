import React from 'react'
import { CompanyList } from './list'
import { Button, Form, Input, Modal, Select, Upload } from 'antd'
import { useModalForm, useSelect } from '@refinedev/antd'
import { useGo } from '@refinedev/core'
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations'
import { UploadOutlined } from '@ant-design/icons'
import { USERS_SELECT_QUERY } from '@/graphql/queries'
import SelectOptionWithAvatar from '@/components/select-option-with-avatar'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { UsersSelectQuery } from '@/graphql/types'

const Create = () => {
    const go = useGo();

    const gotoListPage =()=>{
        go({
            to:{
                resource:'companies',
                action:'list'
            },
            options:{
                keepQuery:true
            },
            type:'replace'
        })
    }

    const { formProps, modalProps } = useModalForm({
        action: "create",
        defaultVisible:true,
        resource: "companies",
        redirect:false,
        mutationMode:"pessimistic",
        onMutationSuccess: gotoListPage,
        meta:{
            gqlQuery:CREATE_COMPANY_MUTATION
        }
     } )

     const { selectProps, queryResult } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource: "users",
        optionLabel: "name",
        meta: {
          gqlQuery:USERS_SELECT_QUERY ,
        },
      });

  return (
    <CompanyList>
        <Modal
        {...modalProps}
        mask={true}
        onCancel={gotoListPage}
        title="Create Company Materials"
        width={512}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item label="Company Name" name="name" rules={[{required:true}]}>
                    <Input placeholder='Please enter the company name'/>
                </Form.Item>
                
                {/* materials should be able to add */}
                {/* <Form.Item label="Materials" name="materials" rules={[{ required: true }]}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Upload Materials</Button>
                        </Upload>
                    </Form.Item> */}

                <Form.Item label="Material Provider" name="salesOwnerId" rules={[{required:true}]}>

                    <Select 
                    placeholder="Material Provider" 
                {...selectProps}
                options={
                    queryResult.data?.data.map((user) => ({
                        value: user.id,
                        label:(
                            <SelectOptionWithAvatar
                            name={user.name}
                            avatarUrl={user.avatarUrl ?? undefined} />
                        )
                    })) ?? []
                
                }
                />
                </Form.Item>
            </Form>

        </Modal>
    </CompanyList>
  )
}

export default Create
