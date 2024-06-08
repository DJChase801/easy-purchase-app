import React from 'react';
import { ContactsOutlined, SkinOutlined, DollarOutlined } from '@ant-design/icons';
import MembersPane from './AdminTabs/MembersPane/membersPane';
import ProductsPane from './AdminTabs/ProductsPane/productsPane';
import PurchasesPane from './AdminTabs/PurchasesPane/purchasesPane';
import ConfirmModal from '../../ReusableComponents/Modals/confirmModal';
import { Tabs } from 'antd';
import AdminPageModel from './adminPage.model';
import { ModelConnector } from '../../Stores/index';
import TopBar from '../../ReusableComponents/TopBar/topBar';
import { observer } from 'mobx-react';
import './adminPage.css';

const AdminPage = observer(({ model }: any) => {
  return (
    <>
      <TopBar programId={model.programId} />
      <div className='admin-page'>

        <Tabs
          items={[
            {
              key: '1',
              label: <div className='label-title'>
                <ContactsOutlined />
                <>  Members</>
              </div>,
              children: <div className='pane'>
                <MembersPane model={model} />
              </div>,
            },
            {
              key: '2',
              label: <div className='label-title'>
                <SkinOutlined />
                <>  Products</>
              </div>,
              children: <div className='pane'>
                <ProductsPane model={model} />
              </div>,
            },
            {
              key: '3',
              label: <div className='label-title'>
                <DollarOutlined />
                <>  Purchases</>
              </div>,
              children: <div className='pane'>
                <PurchasesPane model={model} />
              </div>,
            },
          ]}
        />
      </div>
      <ConfirmModal model={model} />
    </>
  );
});

export default ModelConnector(AdminPage, { model: AdminPageModel });
