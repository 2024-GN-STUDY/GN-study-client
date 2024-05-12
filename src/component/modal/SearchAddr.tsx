import "./SearchAddr.css"
import DaumPostcodeEmbed from 'react-daum-postcode';

const Postcode = (props: any) => {


    const setAddr = (address: string) => {
        props.setAddr(address);
    }


    const closeAddrModal = () => {
        props.closeModal();
    }


    const handleComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }


        setAddr(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };






    return (
        <div className="addr_modal">
            <div className="addr_modal__wrap">

                <div className="addr_modal__header">
                    <span>우편번호 찾기</span>
                    <button className="addr_modal_closeBtn" type="button" onClick={closeAddrModal}>X</button>
                </div>

                <div className="addr_modal__content">
                    <DaumPostcodeEmbed
                        onComplete={handleComplete}
                        onClose={closeAddrModal}
                        style={{ width: "100%", height: "100%" }} />
                </div>

            </div>
        </div>
    )
};

export default Postcode;