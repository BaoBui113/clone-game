import React from "react";
import { RowItemTd } from "../shared/common/components/RowItemTd";

type Props = {};

export function BullfightRule({}: Props) {
  return (
    <>
      <div className="mb-3 text-xl font-semibold">BullFight 게임규칙</div>
      <div className="p-3 text-sm text-black bg-white rounded-lg">
        <h3>Bullfight란?</h3>
        <p className="my-2">
          우리나라에서 많이 유행하고 있는 도리짓고땡과 유사한 카지노게임의
          일종입니다. 우선, 유저는 바카라와 동일한 방식으로 플러이어 또는 뱅커에
          배팅을 하게 됩니다.
        </p>
        <p>
          배팅이 완료되면, 딜러는 플레이어와 뱅커에 각각 5장의 카드가 Dealing
          하게되고,임의의 3장의 카드합을 이용하여 10의 배수(예 : 10 or 20 or
          30)를 조합한 후 밑부분에 깔고, 남은 2장의 카드를 윗부분에 올려놓고
          2장의 카드합을 서로 비교하여 높은숫자를 가진 쪽이 승리하게 됩니다.
          이때, 임의의 3장의 카드합으로 10의 배수를 조합한 경우, 이 패를
          &lt;불(Bull) 또는 황소&gt;라고 부릅니다.
        </p>
        <p className="my-2">
          그러나, 임의의 3장의 카드합으로 10의 배수를 조합할 수 없다면, 이 패를
          &lt;노불(No Bull) 또는 무황소&gt;라고 부르며, 최종적으로 이미 받은
          5장의 카드 중 제일 큰카드의 크기를 서로 비교하여 승패를 결정하게
          됩니다.
        </p>
        <p className="my-2">
          Bullfight 게임은 유저가 뱅커 또는 플레이어에 배팅한 후 각각 어떠한
          패로 이겼느냐? 또는 졌느냐?에 따라 배당금 또는 손실금이 1~3배까지
          변동하게 됩니다.
        </p>
        <p>
          따라서, 이 게임의 경우 배당금과 손실금의 변동폭이 매우 크다는 것이
          가장 큰 특징이라 할 수 있습니다.
        </p>
        <p className="my-2">
          또한, 유저는 기본배팅 외에도 &lt;뱅커투페어, 플레이어투페어,
          뱅커트리플, 플레이어트리플&gt;과 같은 옵션에 별도로 배팅할 수
          있습니다.
        </p>
        <h3 className="my-2 text-lg">(1) 카드크기(값)</h3>
        <ol className="ml-8 list-decimal">
          <li>카드A는 1로 계산되며 모든 그림카드 J,Q,K는 10으로 계산됩니다.</li>
          <li>나머지 숫자카드는 실제 표시된 숫자대로 계산됩니다.</li>
          <li>
            플레이어와 뱅커 모두 임의의 3장의 합으로 &lt;Bull&gt;을 만든
            경우,나머지 2장카드합의 서열은 10&gt;9&gt;8&gt;7&gt; &hellip;
            &hellip;&gt;3&gt;2&gt;1이 됩니다.
          </li>
          <li>
            플레이어와 뱅커 모두 임의의 3장의 합으로 &lt;No Bull&gt;이 된
            경우,이미 받은 5장의 카드 중 제일 큰 카드의 서열은
            K&gt;Q&gt;J10&gt;9&gt;8&gt; &hellip; &hellip; &gt;3&gt;2&gt;1이
            됩니다.
          </li>
        </ol>
        <h3 className="my-2 text-lg">(2) 카드조합 및 서열</h3>
        <ol className="ml-8 list-decimal">
          <li>
            뱅커 또는 플레이어중 어느 한쪽이 Bull(불)이고 다른 한쪽이 No
            Bull(노불)인 경우 무조건 Bull(불)쪽이 승리하게 된다.
          </li>
          <li>
            뱅커와 플레이어 모두 Bull인 경우에는BullBull(불불) &gt; Bull9(불9)
            &gt; Bull8(불8) &gt; &hellip;&hellip; &gt; Bull2(불2) &gt;
            Bul1(불1)순으로 결정한다.
            <blockquote>
              <h4>※ BullBull(불불)이란?</h4>
              <p className="box">
                5장의 카드 중 임의의 3장의 카드합과 나머지2장의 카드합이 전부다
                10의 배수로 조합될 때, 이패를 BullBull(불불)이라고 하며 이
                게임에서 가장 높은 서열의 패가 됩니다.
              </p>
              <p className="box">
                (예) K.8.2.10.Q인 경우 밑부분에 놓인 3장의 카드조합이
                K.8.2(총합20), 윗부분에 놓인 2장 카드의 조합이
                10.Q(총합20)이라고 가정하면, 모두 10의 배수이므로 BullBull 된다.
              </p>
            </blockquote>
          </li>
          <li>
            뱅커와 플레이어 모두 No Bull인 경우에는 5개의 카드 중 제일 높은
            점수의 카드로 승패를 결정하게 된다, 만약, 제일 큰 카드가 똑같을
            경우에는 두 번째로 큰 카드를 가지고 서로 비교하게 되고, 이런
            방법으로 승패가 결정되기까지 5개의 카드를 전부 비교하게 된다
          </li>
        </ol>
        <table
          style={{ width: "100%" }}
          border={0}
          cellPadding="1"
          cellSpacing="1"
          className="my-3 border"
        >
          <tr>
            <th colSpan={4} className="border bg-[#676767] p-2 text-center">
              ◈ 카드조합별 배당율 ◈
            </th>
          </tr>
          <tr>
            <th
              colSpan={2}
              className="border bg-[#676767] p-2 text-center"
              style={{ width: "50%" }}
            >
              승리시
            </th>
            <th
              colSpan={2}
              className="border bg-[#676767] p-2 text-center"
              style={{ width: "50%" }}
            >
              패배시
            </th>
          </tr>
          <tr>
            <th
              style={{ width: "25%" }}
              className="border bg-[#676767] p-2 text-center"
            >
              카드조합
            </th>
            <th
              style={{ width: "25%" }}
              className="border bg-[#676767] p-2 text-center"
            >
              승리배당율
            </th>
            <th
              style={{ width: "25%" }}
              className="border bg-[#676767] p-2 text-center"
            >
              카드조합
            </th>
            <th
              style={{ width: "25%" }}
              className="border bg-[#676767] p-2 text-center"
            >
              손실배당율
            </th>
          </tr>
          <tr>
            <RowItemTd content="No Bull ~ Bull6" />
            <RowItemTd content="0.95배" />
            <RowItemTd content="No Bull ~ Bull6" />
            <RowItemTd content="1배" />
          </tr>
          <tr>
            <RowItemTd content="Bull7 ~ Bull9" />
            <RowItemTd content="1.9배" />
            <RowItemTd content="Bull7 ~ Bull9" />
            <RowItemTd content="2배" />
          </tr>
          <tr>
            <RowItemTd content="BullBull" />
            <RowItemTd content="2.85배" />
            <RowItemTd content="BullBull" />
            <RowItemTd content="3배" />
          </tr>
        </table>
        <ol className="ml-8 list-decimal">
          <li>
            승리시에는 카지노수수료 5%를 떼기 때문에 배당률이 0.95 or 1.9 or
            2.85배가 된다
          </li>
          <li>
            패배시에는 어떠한 카드조합으로 졌는냐에 따라 1~3배의 손실금이 발생할
            수 있기 때문에 배팅시에 배팅금액의 2배에 해당되는 금액이
            &lt;배팅보증금&gt;으로 잔액에서 같이 빠지게 됩니다.
          </li>
        </ol>
        <p>
          예를 들어, 잔액이 100만원 있는 상태에서 뱅커에 10만원을 배팅하게 되면,
          20만원의 배팅보증금이 잔액에서 같이 빠지게 되어 배팅 후에 최종잔액은
          70만원이 남게 됩니다.
          <br />
          이는 만약, 플레이어가 BullBull이 나와 뱅커에 건 배팅이 지는 경우
          손실배당율이 3배가 되므로 총 30만원의 손실금을 물어내야 하기 때문에
          최초에 배팅한 10만원과 별도로 20만원의 보증금을 반드시 내고 게임에
          참여해야 합니다.
        </p>
        <p>
          따라서, Bullfight는 반드시 &lt;배팅액&times;3&gt;만큼이 잔액이
          있어야만 게임에 참여할 수 있습니다.
        </p>
        <table
          style={{ width: "100%" }}
          border={0}
          cellPadding="1"
          cellSpacing="1"
          className="my-2 border"
        >
          <thead>
            <tr>
              <th
                colSpan={3}
                className="border border-[#a5a5a5] bg-[#676767] p-2 text-center"
              >
                ◈ 옵션배팅 배당율 ◈
              </th>
            </tr>
            <tr>
              <th
                style={{ width: "40%" }}
                className="border border-[#a5a5a5] bg-[#676767] p-2 text-center"
              >
                카드조합
              </th>
              <th
                style={{ width: "20%" }}
                className="border border-[#a5a5a5] bg-[#676767] p-2 text-center"
              >
                옵션배당율
              </th>
              <th
                style={{ width: "40%" }}
                className="border border-[#a5a5a5] bg-[#676767] p-2 text-center"
              >
                특이사항
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <RowItemTd content="뱅커투페어 or 플레이어투페어" />
              <RowItemTd content="10배" />
              <RowItemTd
                content="만약, 게임결과 &lt;포카드 or 풀하우스&gt;로 나타나면, &lt;투페어
              or 쓰리카드&gt;배팅은 이기는 것으로 간주됩니다."
                rowSpan={2}
              />
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
