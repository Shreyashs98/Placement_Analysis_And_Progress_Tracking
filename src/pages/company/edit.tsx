import { Col, Form, Row, Select } from "antd";
import { Edit, useSelect } from "@refinedev/antd";
import { useForm } from "@refinedev/core";
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutations";
import CustomAvatar from "@/components/custom-avatar";
import { getNameInitials } from "@/utilities";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import SelectOptionWithAvatar from "@/components/select-option-with-avatar";

const EditPage = () => {
  const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  const { avatarUrl, name } = queryResult?.data?.data || {};

  const { selectProps, queryResult: queryResultUsers } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form {...formProps} layout="vertical">
              <CustomAvatar
                shape="square"
                src={avatarUrl}
                name={getNameInitials(name || "")}
                style={{ width: 96, height: 96, marginBottom: "24px" }}
              />

              <Form.Item
                label="Material Provider"
                name="salesOwnerId"
                initialValue={formProps?.initialValues?.salesOwner?.id}
              >
                <Select
                  placeholder="Material Provider"
                  {...selectProps}
                  options={
                    queryResultUsers.data?.data.map((user) => ({
                      value: user.id,
                      label: (
                        <SelectOptionWithAvatar
                          name={user.name}
                          avatarUrl={user.avatarUrl ?? undefined}
                        />
                      ),
                    })) ?? []
                  }
                />
              </Form.Item>
              <Form.Item>
                <Select />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};

export default EditPage;
