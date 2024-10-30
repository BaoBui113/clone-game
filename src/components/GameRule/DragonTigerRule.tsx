import React from "react";

type Props = {};

export function DragonTigerRule({}: Props) {
  return (
    <div>
      <div className="mb-3 text-xl font-semibold">드래곤타이거 게임규칙</div>
      <div className="p-3 text-sm text-black bg-white rounded-lg">
        <p>
          드래곤타이거는 단 1장의 카드만으로 승패를 결정하는 게임으로써
          카지노에서 제공되는 그 어떤 게임보다도 가장 빠르게 게임이 진행되며
          게임룰 또한 매우 단순합니다.
        </p>
        <p>
          우선, 손님이 배팅할 수 있는 곳은 드래곤(Dragon) 또는
          타이거(Tiger)입니다. <br />
          &lt;전통바카라에서 플레이어와 뱅커 중 둘중에 한곳에 배팅하는 것과
          동일한 방식입니다.&gt;
        </p>
        <p>
          드래곤과 타이거는 각자 단 1장의 카드만을 받게 되며 양쪽이 받은 카드 중
          높은 숫자를 받은 곳이 승리하게 됩니다. <br />
          <strong>
            &lt;카드의 순위는 K &rarr; Q &rarr; J &rarr; 10 &rarr; 9 &rarr;
            &middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot; A의
            순으로 밑으로 갈수록 낮은숫자가 되며, 따라서, 가장 높은 숫자는 K이고
            가장 낮은 숫자는 A가 됩니다.&gt;
          </strong>
        </p>
        <p>
          또한, 손님은 타이에도 배팅할 수 있으며 드래곤과 타이거가 받은 카드가
          동일한 경우 배팅금액의 8배를 배당받게 됩니다. <br />
          만약, 타이에 배팅하지 않은 상태에서 드래곤과 타이거가 같은 카드를 받아
          타이가 나오게 되면, 손님은 배팅한 금액의 &frac12;만을 돌려받습니다.
        </p>
      </div>
    </div>
  );
}
