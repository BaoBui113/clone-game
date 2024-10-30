import { Spinner } from "@/components/shared/utils/misc/spinner";
import { useSupportContext } from "../provider/support-provider";
import { Button } from "@/components/shared/utils/form/Button";

export function BoxItemDetail({
    ...props
  }: {
 
  }) {
    const { setSeq ,noticeSel} = useSupportContext();
  
    return (
      <div className="flex flex-col items-center w-full gap-2">
        {!noticeSel ? <Spinner/> : (
          <div className="w-full p-3 text-black bg-white rounded-md h-[500px] overflow-y-auto">
          
          <div
            className="w-full p-2 bg-gray-200 rounded"
            dangerouslySetInnerHTML={{
              __html: noticeSel?.data?.NOTICE_TITLE || "",
            }}
          />
          <div
            className="p-2 my-2 text-sm text-right border-b"
            dangerouslySetInnerHTML={{
              __html: `<span>등록일:</span> ${noticeSel?.data?.RGST_DT}`,
            }}
          />
          <div
            className=""
            dangerouslySetInnerHTML={{
              __html: noticeSel?.data?.NOTICE_CONTENT || ""
              ,
            }}
          />
          </div>
        )}
  
        <Button
          text="돌아가기"
          onClick={() => setSeq?.(null as any)}
          className={"w-28 border-none bg-red-500 px-4 py-2 text-black justify-center"}
        />
      </div>
    );
  }