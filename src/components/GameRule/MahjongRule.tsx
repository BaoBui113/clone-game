import React from 'react'
import { RowItemTd } from '../shared/common/components/RowItemTd'

type Props = {}

export  function MahjongRule({}: Props) {
  return (
    <>
      <div className="mb-3 text-xl font-semibold">마종 게임규칙</div>
      <div className="p-3 text-sm text-black bg-white rounded-lg">
        <h3>마종은?</h3>
        <p>
          우리나라 화투게임의 일종인 섯다와 유사하며 게임에 사용되는 기구는
          마작패입니다.
          <br />이 마작패는 백판.9통.8통.7통.6통.5통.4통.3통.2통.1통으로
          불리우며 , 각각 2개의패를 가지고 총 20개로 이루어져 있습니다.
        </p>
        <p>
          마종게임은 뱅커와 플레이어에게 각 2개씩 패를 돌리고, 마작패의 서열에
          따라 승패를 겨루게 되는 단순한 게임입니다.
        </p>
        <p>
          이러한 특징으로 인해 마종게임은 다소 독특한 방식으로 게임이
          진행됩니다.
        </p>
        <ol className="my-3 ml-8 list-decimal">
          <li>
            딜러가 패를 돌리기 전에, 유저들은 카지노와 같은 입장의 뱅커가 되는
            것을 선택할 수 도 있고, 단순한 유저가 되어 테이블에 표시된 1~6번의
            임의의 플레이어 배팅구역에 배팅을 할 수도 있습니다.
          </li>
          <li>
            뱅커가 되고자 하는 유저는 자신이 뱅커가 되기 위한 일정금액을
            입찰해야만 하며 각각의 유저가 입찰한 금액을 모두 비교하여 가장 큰
            금액을 제시한 유저 1명이 뱅커의 자격을 얻게 됩니다.
          </li>
          <li>
            이렇게 뱅커가 결정되면, 모든 유저들은 각자의 좌석에서 플레이어배팅을
            시작하고 배팅이 완료되면, 딜러는 뱅커 및 6명의 플레이어에게 각 2개씩
            마작패를 Dealing한 후 서로 승패를 결정합니다.
          </li>
          <li>
            최종승패 결과 만약, 플레이어의 이긴 총 배팅금액이 뱅커의 입찰금액을
            초과할 경우, 혹은 그 반대인 경우에는, 아직 배당되지 못한 모자란
            이긴배팅금액에 대해 카지노회사에서 당사자에게 보상을 해주게 됩니다.
          </li>
        </ol>
        <h3>(1) 마종게임 Rule</h3>
        <p>
          마종게임은 섯다의 게임룰과 매우 유사합니다.
          <br />
          섯다의 경우
          장땡&gt;9땡&gt;8땡&gt;&hellip;&hellip;&gt;3땡&gt;2땡&gt;1땡&gt;9끗&gt;8끗&gt;&hellip;&hellip;&gt;2끗&gt;1끗&gt;0끗
          순으로 서열이 매겨지듯이 마종게임의 서열도 거의 동일하다고 생각하시면
          됩니다.
        </p>
        <ol className="my-3 ml-8 list-decimal">
          <li>
            똑같은 기호의 마작패 2개를 쌍패라고 하며 가장 높은 서열입니다. 또한,
            쌍패의 서열은
            백판&gt;9통&gt;8통&gt;7통&gt;6통&gt;5통&gt;4통&gt;3통&gt;2통&gt;1통의
            순입니다.
          </li>
          <li>
            쌍패가 없는 경우, 2개마작패 합의 끝자리 수에 의해 서열이 결정되며
            끝자리 수의 서열은 9&gt;8&gt;7&gt;6&gt;5&gt;4&gt;3&gt;2&gt;1&gt;0의
            순이며 &lt;백판&gt;은 0으로 계산됩니다.
          </li>
          <li>
            끝자리 수가 같은 경우, 더 큰 숫자의 마작패를 가지고 있는 사람이
            이기게 됩니다. 따라서, 양 쪽다 쌍패가 아닌 상태에서 끝자리 수로
            승패를 겨루게 되는 경우에는 &lt;9통+백판&gt;의 조합이 가장 높은
            서열이고 &lt;6통+4통&gt;의 조합이 가장 낮은 서열이 됩니다.
            <table
              width="100%"
              cellPadding="1"
              cellSpacing="1"
              className="my-3 border border-[#a5a5a5] bg-[#676767] "
            >
              <thead>
                <tr className="bg-[#676767]">
                  <th
                    style={{ width: "15%" }}
                    className="border border-[#a5a5a5] p-2 text-center"
                  >
                    끝자리 수
                  </th>
                  <th
                    style={{ width: "85%" }}
                    className="border border-[#a5a5a5] p-2 text-center"
                  >
                    카드조합의 서열
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <RowItemTd content="9" />
                  <RowItemTd content="(9통+백판) &gt; (8통+1통) &gt; (7통+2통) &gt; (6통+3통) &gt; (5통+4통)" />
                </tr>
                <tr>
                  <RowItemTd content="8" />
                  <RowItemTd content="(8통+백판) &gt; (7통+1통) &gt; (6통+2통) &gt; (5통+3통)" />
                </tr>
                <tr>
                  <RowItemTd content="7" />
                  <RowItemTd content="(9통+8통) &gt; (7통+백판) &gt; (6통+1통) &gt; (5통+2통) &gt; (4통+3통)" />
                </tr>
                <tr>
                  <RowItemTd content="6" />
                  <RowItemTd content="(9통+7통) &gt; (6통+백판) &gt; (5통+1통) &gt; (4통+2통)" />
                </tr>
                <tr>
                  <RowItemTd content="5" />
                  <RowItemTd content="(9통+6통) &gt; (8통+7통) &gt; (5통+백판) &gt; (4통+1통) &gt; (3통+2통)" />
                </tr>
                <tr>
                  <RowItemTd content="4" />
                  <RowItemTd content="(9통+5통) &gt; (8통+6통) &gt; (4통+백판) &gt; (3통+1통)" />
                </tr>
                <tr>
                  <RowItemTd content="3" />
                  <RowItemTd content="(9통+4통) &gt; (8통+5통) &gt; (7통+6통) &gt; (3통+백판) &gt; (2통+1통)" />
                </tr>
                <tr>
                  <RowItemTd content="2" />
                  <RowItemTd content="(9통+3통) &gt; (8통+4통) &gt; (7통+5통) &gt; (2통+백판)" />
                </tr>
                <tr>
                  <RowItemTd content="1" />
                  <RowItemTd content="(9통+2통) &gt; (8통+3통) &gt; (7통+4통) &gt; (6통+5통) &gt; (1통+백판)" />
                </tr>
                <tr>
                  <RowItemTd content="0" />
                  <RowItemTd content="(9통+1통) &gt; (8통+2통) &gt; (7통+3통) &gt; (6통+4통)" />
                </tr>
              </tbody>
            </table>
          </li>
          <li>
            뱅커와 플레이어가 동일한 셋트의 마작패를 가지고 있는 경우, 뱅커가
            이기게 됩니다.
          </li>
        </ol>
      </div>
    </>
  );
}