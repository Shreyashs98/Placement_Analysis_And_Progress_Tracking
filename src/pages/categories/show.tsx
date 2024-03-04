import { NumberField, Show, TextField } from "@refinedev/antd";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Typography } from "antd";
import React from "react";
import { CATEGORY_SHOW_QUERY } from "./queries";

const { Title } = Typography;

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({
    meta: {
      gqlQuery: CATEGORY_SHOW_QUERY,
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>{"Title"}</Title>
      <TextField value={record?.title} />
    </Show>
  );
};
