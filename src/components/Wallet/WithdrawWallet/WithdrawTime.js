

const WithdrawTime = ({ cnt = 0, tranTime = 0, ioAmount = 0 }) => {
    return (
        <div>
            <h2>출금대기현황</h2>
            <div>
                <p>- 현재 고객님의 출금 예상소요시간은 {tranTime}분 입니다.</p>
            </div>
            <div className="py-10">
                <table width="100%" border="0" cellPadding="0" cellSpacing="0" className="border-collapse border border-slate-500">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="border border-slate-600 p-2" width="40%" align="center">출금금액</th>
                            <th className="border border-slate-600 p-2" width="30%" align="center">대기인원</th>
                            <th className="border border-slate-600 p-2" width="40%" align="center">예상소요시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-slate-600 p-2" align="center">{ioAmount} 원</td>
                            <td className="border border-slate-600 p-2" align="center">{cnt} 명</td>
                            <td className="border border-slate-600 p-2" align="center">{tranTime} 분</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="border border-slate-600 p-2" align="center" colSpan="3">출금 처리가 모두 완료되었습니다.</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default WithdrawTime