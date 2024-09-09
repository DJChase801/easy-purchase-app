import React from 'react';
import { observer } from 'mobx-react';
import { Table, Space, Modal } from 'antd';


const ImportMembersModal = ({ model }: any) => {
    return(<Modal
        title={
          <div className="title">
            <span className="fancy">Import</span> Members
          </div>
        }
        onCancel={() => model.setShowMemberImportModal(false)}
        open={model.showMemberImportModal}
        closable={false}
        footer={[]}
      >
        <div className="modal-label">Upload CSV File</div>
        <div>Columns must be | First Name | Last Name | Email | Phone |</div>
        <br />
        <input
          type="file"
          accept=".csv"
          onChange={(e) => model.importMembers(e?.target?.files)}
        />
        <br />
        <br />
        <br />
        <div className='checkout-buttons'>
          <button className='stage-button cancel' onClick={() => model.setShowMemberImportModal(false)}>
            Cancel
          </button>
          <button className='stage-button' onClick={() => model.importMembers()} disabled={!model.importFile}>
            Import
          </button>
        </div>
      </Modal>);
};


export default observer(ImportMembersModal);
