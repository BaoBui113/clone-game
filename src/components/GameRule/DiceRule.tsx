import React from "react";
import { RowItemTd } from "../shared/common/components/RowItemTd";

type Props = {};

export function DiceRule({}: Props) {
  return (
    <>
      <div className="mb-3 text-xl font-semibold">식보 게임규칙</div>
      <div className="p-3 text-sm text-black bg-white rounded-lg">
        <ol className="ml-8 list-decimal">
          <li>
            식보 게임은 3개의 주사위로 하는 게임이며 카운트 다운 전에 플레이어가
            무엇을 배팅할지를 정하는 것입니다.
          </li>
          <li>
            카운트 다운이 끝나면 3개의 주사위는 잠시 흔들어지며 굴려진 후에 위로
            보여지는 면의 숫자 조합으로 결과를 정합니다.
          </li>
          <li>
            결과가 불분명하게 나왔을 때는 주사위를 다시 던집니다. 예를 들면
            주사위가 겹쳐져 윗면이 정확하게 나오지 않거나 게임결과가 부정확 할
            때 다시 던지게 됩니다.
          </li>
          <li>
            결과는 3개중 두 개의 주사위로 정해집니다. (크거나 작거나 혹은 짝수
            홀수)
          </li>
        </ol>
        <table
          width="100%"
          cellPadding="1"
          cellSpacing="1"
          className="mt-3 border"
        >
          <thead>
            <tr className="bg-[#676767]">
              <th style={{ width: "20%" }} className="p-2 text-center border">
                Type of Bets
              </th>
              <th style={{ width: "60%" }} className="p-2 text-center border">
                Description
              </th>
              <th style={{ width: "20%" }} className="p-2 text-center border">
                Payout
              </th>
            </tr>
            <tr>
              <th colSpan={3} className="border bg-[#676767] p-2 text-center">
                Specific total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <RowItemTd content="Big" />
              <RowItemTd content="Sum of the numbers is from 11 to 17" />
              <RowItemTd content="1:1" />
            </tr>
            <tr>
              <RowItemTd content="Small" />
              <RowItemTd content="Sum of the numbers is from 4 to 10" />
              <RowItemTd content="1:1" />
            </tr>
            <tr>
              <RowItemTd content="Odd" />
              <RowItemTd content="Sum of the numbers is any of 5, 7, 9, 11, 13, 15, 17" />
              <RowItemTd content="1:1" />
            </tr>
            <tr>
              <RowItemTd content="Even" />
              <RowItemTd content="Sum of the numbers is any of 4, 6, 8, 10, 12, 14, 16" />
              <RowItemTd content="1.1" />
            </tr>
            <tr>
              <RowItemTd content="4 or 17" />
              <RowItemTd content="Sum of the numbers is either 4 or 17" />
              <RowItemTd content="1:50" />
            </tr>
            <tr>
              <RowItemTd content="5 or 16" />
              <RowItemTd content="Sum of the numbers is either 5 or 16" />
              <RowItemTd content="1:18" />
            </tr>
            <tr>
              <RowItemTd content="6 or 15" />
              <RowItemTd content="Sum of the numbers is either 6 or 15" />
              <RowItemTd content="1:14" />
            </tr>
            <tr>
              <RowItemTd content="7 or 14" />
              <RowItemTd content="Sum of the numbers is either 7 or 14" />
              <RowItemTd content="1:12" />
            </tr>
            <tr>
              <RowItemTd content="8 or 13" />
              <RowItemTd content="Sum of the numbers is either 8 or 13" />
              <RowItemTd content="1:8" />
            </tr>
            <tr>
              <RowItemTd content="9, 10, 11 or 12" />
              <RowItemTd content="Sum of the numbers is any of 9, 10, 11 or 12" />
              <RowItemTd content="1:6" />
            </tr>
            <tr>
              <th colSpan={3} className="border bg-[#676767] p-2 text-center">
                Combination bets
              </th>
            </tr>
            <tr>
              <RowItemTd content="Specific Triple" />
              <RowItemTd
                content="Three dice showing the same number which must be the specific
              number selected"
              />
              <RowItemTd content="1:150" />
            </tr>
            <tr>
              <RowItemTd content="Any Triple" />
              <RowItemTd
                content=" Three dice showing the same number which can be any of six
              possible numbers"
              />
              <RowItemTd content="1:24" />
            </tr>
            <tr>
              <RowItemTd content="Specific Double" />
              <RowItemTd content="Two of the three dice must show the double selected" />
              <RowItemTd content="1:8" />
            </tr>
            <tr>
              <RowItemTd content="Pair Match" />
              <RowItemTd content="Two of the three dice must make the pair selected" />
              <RowItemTd content="1:5" />
            </tr>
            <tr>
              <RowItemTd content="Triple Match" />
              <RowItemTd content="Three dice must be the three of four numbers selected" />
              <RowItemTd content="1:7" />
            </tr>
            <tr>
              <RowItemTd content="Number Match" rowSpan={3} />
              <RowItemTd content="One of three dice matches the number selected - Single" />
              <RowItemTd content="1:1" />
            </tr>
            <tr>
              <RowItemTd content="Two of three dice match the number selected - Double" />
              <RowItemTd content="1:2" />
            </tr>
            <tr>
              <RowItemTd content="All three dice match the number selected - Triple" />
              <RowItemTd content="1:3" />
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
