import React from "react";

type Props = {};

export function RouletteRule({}: Props) {
  return (
    <>
      <div className="mb-3 text-xl font-semibold">룰렛 게임규칙</div>
      <div className="p-3 text-sm text-black bg-white rounded-lg">
        <ol className="ml-8 list-decimal">
          <li>
            {`저희 게임은 유럽식의 룰렛게임이며 여기에는 한 개의 구슬이 들어가는
            37개의 작은 칸막이가 있습니다.`}{" "}
            <br />
            {` (0에서36까지)`}
          </li>
          <li>
           {` 룰렛은 시계방향으로 돌아가며 멈출 때마다 한번의 게임이 이루어집니다.
        
            딜러는 휠 을 돌리고 구슬을 던지며 구슬은 특정 칸에서 멈추게 됩니다.`}
          </li>
          <li>
            {`  룰렛 게임은 구슬이 멈췄을 때 구슬이 어느 특정 색깔 (붉은색 혹은
            검은색) 이나 특정숫자 혹은 숫자의 조합에 떨어지는지를 맞추는
            게임입니다.`}
          </li>
        </ol>
        <h3>배팅하기</h3>
        <p>
          {` 룰렛 테이블은 1~36까지의 숫자를 12개 칸씩 3열로 있고 색깔 별로도
          배팅을 할 수 있습니다.`}
          <br />
          {` 이것이 이 게임의 특성이며 여기에는 여러 가지 다양한 배팅 법이
          존재합니다. 직접배팅, 2개 숫자배팅, 분할배팅(이등분배팅), 3개
          숫자배팅(3등분배팅), 모서리배팅, 6개 숫자배팅, 12개 숫자배팅,
          색깔배팅, 홀짝 배팅, 고저 배팅 등 배팅에 제약이 없습니다.`}
          <br />
          {`게임자가 임의로 배팅을 정할 수 있습니다.`}
          <br />
          {`  컴퓨터 오른쪽 상단에 최근 휠 이 돌아간 숫자가 보여지며, 현재 휠 이
          돌아서 특정 칸에 멈추기 전까지 어떤 특정숫자가 나올 확률이 높은 쪽을
          예상할 수 있는 좋은 기회가 옵니다`}
        </p>
        <p>
          {` (아래쪽 그림에서 자기자본을 포함하지 않는 배팅종류의 배당률을 볼 수
          있다.)`}
          <br />
          {` 룰렛 에는 여러 다른 배팅이 존재하며, 각각의 조합에는 최소 배팅이
          정해져 있다. ("최소금액"세부사항 참조) 편의를 위해서 최소 배팅에 못
          미치게 배팅하더라도 시스템이 최소배팅에 해당하는 금액으로 자동적으로
          배팅하게 되어있다.`}
        </p>
        <table
          width="100%"
          cellPadding="1"
          cellSpacing="1"
          className="my-3 border border-gray-500 "
        >
          <thead>
            <tr className="bg-[#676767]">
              <th
                style={{ width: "50%" }}
                className="p-2 font-light text-center text-white"
              >
                Type of Bets
              </th>
              <th
                style={{ width: "50%" }}
                className="p-2 text-center text-white"
              >
                {` Odds (Capital not included)`}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
                Straight Bets
              </th>
              <td className="border border-gray-500 bg-[#a5a5a5] p-2 text-center">
                1:35
              </td>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
                Split Bets
              </th>
              <td className="border border-gray-500 bg-[#a5a5a5] p-2 text-center">
                1:17
              </td>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
                Trio Bets
              </th>
              <td className="border border-gray-500 bg-[#a5a5a5] p-2 text-center">
                1:11
              </td>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
                The Corner Bets
              </th>
              <td className="border border-gray-500 bg-[#a5a5a5] p-2 text-center ">
                1:8
              </td>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
                The 6 Number Bet
              </th>
              <td className="border border-gray-500 bg-[#a5a5a5] p-2 text-center ">
                1:5
              </td>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
                The Dozen Bet
              </th>
              <td className="border border-gray-500 bg-[#a5a5a5] p-2 text-center ">
                1:2
              </td>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
               {` Bet on "0"`}
              </th>
              <td className="border border-gray-500 bg-[#a5a5a5] p-2 text-center">
                1:35
              </td>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
                Column Bet
              </th>
              <td className="border border-gray-500 bg-[#a5a5a5] p-2 text-center">
                1:2
              </td>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
                Section Bet
              </th>
              <td
                className="border border-gray-500 bg-[#a5a5a5] p-2 text-center"
                rowSpan={3}
              >
                1:2
              </td>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
                {`Small Odd / Small Even or Big Odd / Big Even Bet`}
              </th>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white ">
                {` Big Red / Small Red or Big Black / Small Black Bet`}
              </th>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
                Red or Black
              </th>
              <td
                className="border border-gray-500 bg-[#a5a5a5] p-2 text-center "
                rowSpan={3}
              >
                1:1
              </td>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
                High or Low
              </th>
            </tr>
            <tr>
              <th className="border border-gray-500 bg-[#676767] p-2 text-center font-light text-white">
                Even or Odd
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
