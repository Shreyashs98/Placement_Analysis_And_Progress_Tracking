import {
  DateField,
  MarkdownField,
  NumberField,
  Show,
  TextField,
} from "@refinedev/antd";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Typography } from "antd";
import React from "react";
import { POST_SHOW_QUERY } from "./queries";

const { Title } = Typography;

export const BlogPostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({
    meta: {
      gqlQuery: POST_SHOW_QUERY,
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
      <Title level={5}>{"Content"}</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>{"Category"}</Title>
      <TextField value={record?.category?.title} />
      <Title level={5}>{"Status"}</Title>
      <TextField value={record?.status} />
      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
