import React from "react";
import { RowItemTd } from "../shared/common/components/RowItemTd";

type Props = {};

export function PokerRule({}: Props) {
  return (
    <>
      <div className="mb-3 text-xl font-semibold">
        캐리비언스터드포커 게임규칙
      </div>
      <div className="p-3 text-sm text-black bg-white rounded-lg">
        <p>
          플레이어와 딜러가 5장의 카드를 가지고 게임을 하여 높은 서열의 패를
          가진 쪽이 승리하는 카지노게임입니다. 승패를 가리는 카드의 서열은
          일반포커게임과 동일하지만 캐리비언의 경우 플레이어의 패가 아무리
          높아도 딜러의 패가 &lt;Ace와King&gt;의 조합 또는 그 이상의 패를
          가져야만 게임이 성립된 다는 것이 가장 큰 특징입니다.
        </p>
        <p>
          또한, 게임이 성립되고 잭팟배팅(Progressive Betting)을 플레이어가
          플러쉬(Flush)이상의 패를 가지고 승리한 경우에는, 카드조합에 따라
          다양한 잭팟배당금도 받을 수 있습니다
        </p>
        <h3 className="my-2 text-lg">(1) 게임방법</h3>
        <ol className="my-3 ml-8 list-decimal">
          <li>
            플레이어는 앤티(Ante)라는 배팅장소에 일정 금액을 베팅합니다.이때,
            별도로 잭팟배팅(Progressive Betting)도 함께 할 수 있습니다.
          </li>
          <li>
            딜러는 플레이어와 딜러에게 각각 5장의 카드를 Dealing 하되, 딜러는
            5장의 카드 중 한 장 의 카드를 플레이어가 볼 수 있도록
            오픈(Face-up)합니다.
          </li>
          <li>
            플레이어는 자신의 카드 패를 확인 한 후 게임을 포기(Fold)할 것인지
            진행(Call)할 것 인지를 결정합니다.
          </li>
          <li>
            플레이어가 게임을 포기 할 경우 딜러는 앤티배팅 금액을 가져갑니다.
            <br />
            그러나 게임을 계속하기를 원한다면 Call Bet 이라는 장소에 반드시 Ante
            배팅의 2배의 금액을 추가로 배팅하여야 합니다.
          </li>
          <li>
            플레이어가 Call Bet 한 후에 딜러는 자신의 카드를 모두 오픈합니다.
          </li>
          <li>
            오픈된 딜러의 패가 &lt;Ace와King의 조합&gt;이 되지 않을 시 딜러는
            No-Hand를 선언하고 플레이어에게 Call Bet 금액은 그대로 돌려주고
            앤티배팅 금액의 1배를 지불(Pay)합니다.
          </li>
          <li>
            {" "}
            만약, 오픈된 딜러의 패가 &lt;Ace와King 조합&gt; 또는 그 이상의 패를
            가진 경우에는 플레이어의 패와 승패를 겨루게 됩니다. 이때, 플레이어가
            딜러보다 높은 패를 가졌을 경우에는 게임 규칙에 따라 그 배당금을
            플레이어에게 지불하고 낮은 패를 가졌을 경우에는 딜러가 &lt;Ante 와
            Call Bet&gt;의 배팅금을 모두 가져가게 됩니다.
          </li>
        </ol>
        <table width="100%" cellPadding="1" cellSpacing="1">
          <thead>
            <tr>
              <th
                colSpan={3}
                className="border border-[#a5a5a5] bg-[#676767] p-2 text-center"
              >
                ◈ 카드조합별 배당율 ◈
              </th>
            </tr>
            <tr>
              <th
                style={{ width: "40%" }}
                className="border border-[#a5a5a5] bg-[#676767] p-2 text-center"
              >
                플레이어의 카드조합
              </th>
              <th
                style={{ width: "25%" }}
                className="border border-[#a5a5a5] bg-[#676767] p-2 text-center"
              >
                배당율
              </th>
              <th
                style={{ width: "35%" }}
                className="border border-[#a5a5a5] bg-[#676767] p-2 text-center"
              >
                특이사항
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <RowItemTd content="로열스트레이스플러쉬 (Royal Straight Flush)" />
              <RowItemTd content="100배" />
              <RowItemTd
                content="배당금은 Call Bet에 배팅한 금액에 배당율을 곱하여 계산됩니다. (단, 잭팟배당금은 별도)"
                rowSpan={9}
              />
            </tr>
            <tr>
              <RowItemTd content="스트레이트플러쉬 (Straight Flush)" />
              <RowItemTd content="50배" />
            </tr>
            <tr>
              <RowItemTd content="포카드 (Four of Kind)" />
              <RowItemTd content="20배" />
            </tr>
            <tr>
              <RowItemTd content="풀하우스 (Full House)" />
              <RowItemTd content="7배" />
            </tr>
            <tr>
              <RowItemTd content="플러쉬 (Flush)" />
              <RowItemTd content="5배" />
            </tr>
            <tr>
              <RowItemTd content="스트레이트 (Straight)" />
              <RowItemTd content="4배" />
            </tr>
            <tr>
              <RowItemTd content="트리플 (Triple)" />
              <RowItemTd content="3배" />
            </tr>
            <tr>
              <RowItemTd content="투페어 (Two Pair)" />
              <RowItemTd content="2배" />
            </tr>
            <tr>
              <RowItemTd content="원페어 (One Pair)" />
              <RowItemTd content="1배" />
            </tr>
            <tr>
              <th
                colSpan={3}
                className="border border-[#a5a5a5] bg-[#676767] p-2 text-center"
              >
                ◈ 잭팟배당금 ◈
              </th>
            </tr>
            <tr>
              <th
                style={{ width: "40%" }}
                className="border border-[#a5a5a5] bg-[#676767] p-2 text-center"
              >
                플레이어의 카드조합
              </th>
              <th
                style={{ width: "25%" }}
                className="border border-[#a5a5a5] bg-[#676767] p-2 text-center"
              >
                배당금
              </th>
              <th
                style={{ width: "35%" }}
                className="border border-[#a5a5a5] bg-[#676767] p-2 text-center"
              >
                특이사항
              </th>
            </tr>
            <tr>
              <RowItemTd content="로열스트레이스플러쉬 (Royal Straight Flush)" />
              <RowItemTd content="잭팟누진금액 100%" />
              <RowItemTd content="잭팟배당금은 잭팟배팅을 한 플레이어가 플러쉬(Flush) 이상의 패로 이긴 경우에만 지급됩니다." />
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
