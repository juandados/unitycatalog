import { Typography } from 'antd';
import ListLayout from '../layouts/ListLayout';
import { useGetTable } from '../../hooks/tables';

interface ColumnsListProps {
  catalog: string;
  schema: string;
  table: string;
}

export default function ColumnsList({
  catalog,
  schema,
  table,
}: ColumnsListProps) {
  const { data, isLoading } = useGetTable({
    full_name: [catalog, schema, table].join('.'),
  });

  return (
    <ListLayout
      loading={isLoading}
      title={<Typography.Title level={4}>Columns</Typography.Title>}
      data={data?.columns}
      rowKey={(record) => `column-${record.name}`}
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: '30%',
        },
        {
          title: 'Type',
          dataIndex: 'type_name',
          key: 'type',
          width: '30%',
        },
        {
          title: 'Comment',
          dataIndex: 'comment',
          key: 'comment',
          width: '40%',
          render: (comment) => (
            <Typography.Text type="secondary">
              {comment || '—'}
            </Typography.Text>
          ),
        },
      ]}
    />
  );
}
