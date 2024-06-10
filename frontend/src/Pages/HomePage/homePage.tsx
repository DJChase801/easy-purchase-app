import { useEffect } from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react';
import ProductWindow from '../../ReusableComponents/ProductWindow/productWindow';
import AddMemberModal from '../../ReusableComponents/Modals/addMemberModal';
import { ModelConnector } from '../../Stores/index';
import HomePageModel from './homePage.model';
import TopBar from '../../ReusableComponents/TopBar/topBar';
import './homePage.css';


export const HomePage = observer(({ model }: any) => {
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        document.getElementById('search-input')?.focus();
        const memberInput = document.getElementById('member-input');
        if (memberInput) {
            memberInput.tabIndex = 2;
        }
    }, []);
    return (
        <>
            <TopBar />
            <div className='page'>
                <div className='sub-page'>
                    <ProductWindow
                        action={model.addToCart}
                        products={model.products}
                        showSearch={true}
                        btnText={'Add'}
                    />
                </div>
                <div className='sub-page'>
                    <div className='input-meta'>
                        <div className='input-label'>Member Select</div>
                        <span><button onClick={() => model.setShowAddMemberModal(true)} className="link">Add New Member</button></span>
                    </div>
                    <Select
                        id='member-input'
                        className='input'
                        placeholder="Search Members..."
                        onChange={model.memberSelect}
                        value={model.selectedMemberId || undefined}
                        optionFilterProp='children'
                        variant='borderless'
                        size='large'
                        showSearch
                        allowClear
                        filterOption={filterOption}
                        options={model.members.map((member: any) => ({ label: member.fullName, value: member.member_id }))
                            .sort((a: any, b: any) => a.label.localeCompare(b.label))
                        }
                    />
                    <ProductWindow
                        action={model.removeFromCart}
                        products={model.cartProducts}
                        showSearch={false}
                        btnText={'Remove'}
                    />
                    <div className='checkout'>
                        <div style={{ padding: '10px 0'}}>Total: ${model.cartTotal.toFixed(2) || '0.00'}</div>
                        <div className='checkout-buttons'>
                            <button onClick={model.cancelPurchase} className='stage-button cancel'>Cancel</button>
                            <button onClick={model.processPurchase} className='stage-button'>Accept</button>
                        </div>
                    </div>
                </div>
            </div>
            <AddMemberModal model={model} />
        </>
    );
});

export default ModelConnector(HomePage, { model: HomePageModel });
