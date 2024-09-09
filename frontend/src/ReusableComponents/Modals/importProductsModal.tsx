import React from 'react';
import { observer } from 'mobx-react';
import { Table, Space, Modal } from 'antd';


const ImportProductsModal = ({ model }: any) => {
    return(<Modal
        title={
          <div className="title">
            <span className="fancy">Import</span> Products
          </div>
        }
        onCancel={() => model.setShowImportProductsModal(false)}
        open={model.showImportProductsModal}
        closable={false}
        footer={[]}
      >
        <div className="modal-label">Upload CSV File</div>
        <div>Columns must be | Name | Price |</div>
        <div>Note: price input will only be a decimal number, NOT a value with '$' in it.</div>
        <br />
        <input
          type="file"
          accept=".csv"
          onChange={(e) => model.importProducts(e?.target?.files)}
        />
        <br />
        <br />
        <br />
        <div className='checkout-buttons'>
          <button className='stage-button cancel' onClick={() => model.setShowImportProductsModal(false)}>
            Cancel
          </button>
          <button className='stage-button' onClick={() => model.importProducts()} disabled={!model.importFile}>
            Import
          </button>
        </div>
      </Modal>);
};


export default observer(ImportProductsModal);
