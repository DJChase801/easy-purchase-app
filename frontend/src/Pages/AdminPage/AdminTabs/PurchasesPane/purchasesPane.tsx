import React from 'react';
import { observer } from 'mobx-react';
import { DatePicker, Checkbox, Space, Table, Tag } from 'antd';
import AddPurchaseModal from '../../../../ReusableComponents/Modals/addPurchaseModal';
import EditPurchaseModal from '../../../../ReusableComponents/Modals/editPurchaseModal';
import { keys } from 'mobx';
const { RangePicker } = DatePicker;

const PurchasesPane = ({ model }: any) => {
  const onChange = (dates: any, dateStrings: [string, string]) => {
    model.setQueryStartDate(dateStrings[0]);
    model.setQueryEndDate(dateStrings[1]);
  }

  const columns = model.groupByMembers
    ? [
      {
        title: 'Member',
        dataIndex: 'member',
        key: 'member',
        width: 120,
      },
      {
        title: 'Product(s)',
        dataIndex: 'productsNice',
        key: 'products',
        width: 120,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        width: 70,
        render: (amount: number) => (
          <>{`$${amount.toFixed(2)}`}</>
        ),
      },
      {
        title: 'Processed',
        dataIndex: 'processed',
        key: 'processed',
        width: 70,
        render: (processed: boolean) => (
          <>
            {processed
              ? <Tag color='green'>Done</Tag>
              : <Tag color='red'>Nope</Tag>
            }
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        width: 100,
        render: (_: any, record: any) => (
          <Space>
            <div className="link" onClick={() => {
              model.markProcessed(record.purchase_ids.split(','), !record.processed)
              model.setPurchasesRecordProcessed(record);
            }}
            >
              {record.processed ? 'Un-Process' : 'Process'}
            </div>
          </Space>
        ),
      }
    ]
    : [
      {
        title: 'Member',
        dataIndex: 'member',
        key: 'member2',
        width: 120,
      },
      {
        title: 'Product',
        dataIndex: 'product',
        key: 'product2',
        width: 120,
      },
      {
        title: 'Purchase Date',
        dataIndex: 'purchase_date',
        key: 'purchase_date2',
        width: 120,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount2',
        width: 70,
        render: (amount: number) => (
          <>{`$${amount.toFixed(2)}`}</>
        ),
      },
      {
        title: 'Processed',
        dataIndex: 'processed',
        key: 'processed2',
        width: 70,
        render: (processed: boolean) => (
          <>
            {processed
              ? <Tag color='green'>Done</Tag>
              : <Tag color='red'>Nope</Tag>
            }
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        width: 100,
        render: (_: any, record: any) => (
          <Space>
            <div className="link" onClick={() => model.editPurchase(record)}>Edit</div>
            <div className="link" onClick={() => {
              model.markProcessed([record.purchase_id], !record.processed)
              model.setPurchaseRecordProcessed(record);
            }}>{record.processed ? 'Un-Process' : 'Process'}</div>
          </Space>
        ),
      }
    ];
  return (
    <>
      <div className='left-pane'>
        <div className='query-config'>
          <div>
            <div className='pane-label'>Query Purchases</div>
            <RangePicker
              showTime
              size='large'
              onChange={onChange}
              id={{
                start: 'startInput',
                end: 'endInput',
              }}
            />
          </div>
          <div className='check-boxes'>
            <Checkbox
              onChange={(e) => model.setGroupByMembers(e.target.checked)}
              checked={model.groupByMembers}
            >
              Group by Members & Unprocessed
            </Checkbox>
          </div>
        </div>
        <Table
          columns={columns}
          className="pane-table"
          dataSource={[...model.viewPurchaseRecords]}
          scroll={{ y: 500 }}
          pagination={false}
        />
      </div>
      <div className='right-pane'>
        <button onClick={() => model.setShowAddPurchaseModal(true)} className='action-button'>+ Add Purchase</button>
        <button onClick={() => model.processPurchases(true)} className='action-button'>Mark Processed</button>
        <button
          disabled={model.groupByMembers}
          onClick={() => model.processPurchases(false)}
          className='action-button'
          style={model.groupByMembers ? {'backgroundColor': 'gray', cursor: 'not-allowed'} : {}}
        >
          Mark Un-Processed
        </button>
        {/* <button onClick={() => console.log('need to implement')} className='action-button'>Generate Report</button> */}
      </div>
      <AddPurchaseModal model={model} />
      <EditPurchaseModal model={model} />
    </>
  );
};

export default observer(PurchasesPane);
