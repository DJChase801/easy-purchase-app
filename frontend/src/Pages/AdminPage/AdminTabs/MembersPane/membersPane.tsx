import React from 'react';
import { observer } from 'mobx-react';
import { Table, Space, Modal } from 'antd';
import AddMemberModal from '../../../../ReusableComponents/Modals/addMemberModal';
import EditMemberModal from '../../../../ReusableComponents/Modals/editMemberModal';
import ImportMembersModal from '../../../../ReusableComponents/Modals/importMembersModal';


const MembersPane = ({ model }: any) => {
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first-name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last-name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_: any, record: any) => (
        <Space>
          <div className="link" onClick={() => model.editMember(record)}>Edit</div>
        </Space>
      ),
    }
  ];

  return (
    <>
      <div className='left-pane'>
        <div className='pane-label'>Member Search</div>
        <input
          id="search-input"
          className='pane-input'
          placeholder="Search Members..."
          onChange={(e) => model.setMemberSearchValue(e.target.value)}
        />
        <Table
          columns={columns}
          className="pane-table"
          dataSource={model.viewMembers}
          scroll={{ y: 500 }}
          pagination={false}
        />
      </div>
      <div className='right-pane'>
        <button onClick={() => model.setShowAddMemberModal(true)} className='action-button'>+ Add New Member</button>
        <button onClick={() => model.setShowMemberImportModal(true)} className='action-button'>Import Members</button>
      </div>
      <AddMemberModal model={model} />
      <EditMemberModal model={model} />
      <ImportMembersModal model={model} />
    </>
  );
};


export default observer(MembersPane);
