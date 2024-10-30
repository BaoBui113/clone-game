


const Bank = () => {
    return (
        <div>
            <h2 className="flex justify-center">인터넷뱅킹</h2>
            <p> <strong>※ 입금시 꼭 필독해주세요.</strong></p>
            <div className="pb-5">
                <p>
                    - 입금 진행하시기 전에 꼭 현재 문자로 발송된 계좌로 입금해주세요.<br />
                    - 입금계좌 문자가 오지않으면 홈페이지 [입금계좌재전송]을 클릭해주세요<br />
                    - 입금계좌 수시 변경될 수 있습니다.<br />
                    - 만약 현재 진행계좌로 입금하지 않으면 처리가 되지 않을 수 있습니다.
                </p>
            </div>
            <a href="#"><img src="/images/bank/bank.gif" border="0" useMap="#bank" />
                <map name="bank" id="bank">
                    <area shape="rect" coords="-4,7,110,49" href="https://www.kbstar.com/" target="_blank" alt="국민은행" />
                    <area shape="rect" coords="113,7,221,51" href="https://www.nonghyup.com/" target="_blank" alt="농협" />
                    <area shape="rect" coords="227,6,334,50" href="https://www.wooribank.com/" target="_blank" alt="우리은행" />
                    <area shape="rect" coords="343,7,450,50" href="https://www.epost.go.kr/" target="_blank" alt="우체국" />
                    <area shape="rect" coords="457,6,562,50" href="https://www.hanabank.com/" target="_blank" alt="하나은행" />
                    <area shape="rect" coords="5,65,110,119" href="https://www.ibk.co.kr/" target="_blank" alt="IBK" />
                    <area shape="rect" coords="116,64,222,115" href="https://www.shinhan.com/" target="_blank" alt="신한은행" />
                    <area shape="rect" coords="229,62,338,114" href="https://www.citibank.co.kr/" target="_blank" alt="씨티" />
                    <area shape="rect" coords="343,61,450,115" href="https://www.keb.co.kr/" target="_blank" alt="외환은행" />
                    <area shape="rect" coords="456,65,564,115" href="https://www.scfirstbank.com/" target="_blank" alt="제일은행" />
                    <area shape="rect" coords="1,127,111,175" href="https://www.knbank.co.kr/" target="_blank" alt="경남은행" />
                    <area shape="rect" coords="116,126,226,175" href="https://www.kjbank.com/" target="_blank" alt="광주은행" />
                    <area shape="rect" coords="228,125,338,176" href="https://www.busanbank.co.kr/" target="_blank" alt="부산은행" />
                    <area shape="rect" coords="343,123,454,180" href="https://www.kfcc.co.kr/" target="_blank" alt="새마을금고" />
                    <area shape="rect" coords="456,125,566,179" href="https://www.cu.co.kr/" target="_blank" alt="신협" />
                </map>
            </a>
        </div>
    )
}

export default Bank