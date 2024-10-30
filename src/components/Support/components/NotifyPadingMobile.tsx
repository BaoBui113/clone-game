import React from "react";
import { useSupportContext } from "../provider/support-provider";
import { Spinner } from "@/components/shared/utils/misc/spinner";

type Props = {};

export function NotifyPagingMobile({
  notifies,
}: {
  notifies: { NOTICE_TITLE?: string; NOTICE_SEQ?: string; RGST_DT?: string }[];
}) {
  const { setSeq } = useSupportContext();
  if (!notifies) return <Spinner />;
  return (
    <div>
      {notifies.length == 0 ? (
        <div className="p-2 text-center text-black bg-white ">게시물이 없습니다</div>
      ) : (
        notifies.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSeq?.(item.NOTICE_SEQ as any)}
            className="p-2 bg-white border-b border-black"
          >
            <div className="text-sm cursor-pointer text-warning">{item?.NOTICE_TITLE}</div>
            <div className="flex flex-row items-center justify-between text-xs text-black">
              <span className="text-blue-500">{item.NOTICE_SEQ}</span> <span>{item.RGST_DT}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
