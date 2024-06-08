import React from 'react';
import { Dropdown, Space } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import BarsOutlined from '@ant-design/icons/lib/icons/BarsOutlined';
import { ModelConnector } from '../../Stores/index';
import TopBarModel from './topBar.model';
import { useNavigate } from 'react-router-dom';
import './topBar.css';


const TopBar = ({ model }: any) => {
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            label: <div onClick={() => model.navigateToPage('home', navigate)}>Home</div>,
            key: '0',
        },
        {
            label: <div onClick={() => model.navigateToPage('admin', navigate)}>Admin</div>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <div onClick={() => model.navigateToPage('', navigate)}>Logout 👋</div>,
            key: '3',
        },
    ];

    return (
        <div className="top-bar">
            <div>
                <span data-testid='app-title' className="fancy">Easy</span> Purchase App
            </div>
            <Dropdown className="page-nav" menu={{ items }} trigger={['click']}>
                <span data-testid='nav' onClick={(e) => e.preventDefault()}>
                    <Space>
                        <BarsOutlined />
                    </Space>
                </span>
            </Dropdown>
        </div>
    );
};

export default ModelConnector(TopBar, { model: TopBarModel });
