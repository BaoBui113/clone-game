import React, { useEffect, useState } from "react";
import { DialogComponentProps, DialogModal } from "../../utils/dialog/dialog";
import Image from "next/image";
import { Button } from "../../utils/form/Button";

type Props = {
  img: string | any;
};

export function NotifyAdsDialog({
  img,
  ...props
}: Props & DialogComponentProps) {
  const [shownImages, setShownImages] = useState<number[]>([0, 1]);
  const [widthDialog, setWidthDialog] = useState<number | any>(props.width);

  const handleCloseImage = (index: number) => {
    setShownImages((prevState) =>
      prevState.filter((itemIndex) => itemIndex !== index)
    );
    setWidthDialog(widthDialog - 550);
  };

  const handleCloseDialog = () => {
    props.onClose();
  };
  useEffect(() => {
    if (shownImages.length == 0) {
      handleCloseDialog();
    }
  }, [shownImages]);
  return (
    <DialogModal
      isOpen={props.isOpen}
      onClose={handleCloseDialog}
      width={widthDialog}
      className="p-0"
      isOverlayClick={true}
      isBtnClose={false}
    >
      <div
        className={`grid w-full grid-cols-1  lg:grid-cols-${shownImages?.length} md:grid-cols-${shownImages?.length} sm:grid-cols-${shownImages?.length} gap-2  lg:gap-1`}
      >
        {!!img.length &&
          img.map(
            (item: string, index: number) =>
              shownImages.includes(index) && (
                <AdsItem
                  key={index}
                  img={item}
                  isClose={index}
                  stopSeenToday={() => handleCloseImage(index)}
                />
              )
          )}
      </div>
    </DialogModal>
  );
}

function AdsItem({
  img,
  isClose,
  stopSeenToday,
}: {
  img: string;
  isClose: number;
  stopSeenToday: () => any;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Image
        src={img}
        alt="image ads"
        width={450}
        height={"0"}
        className={"h-auto w-full"}
      />
      <div className="flex flex-row items-center justify-end gap-2 mt-2">
        <Button
          type="button"
          className={"border-warning text-[8px] !text-warning lg:text-sm"}
          text="오늘 하루 그만보기"
          onClick={stopSeenToday}
        />
        <Button
          type="button"
          className={"border-warning text-[8px] !text-warning lg:text-sm"}
          text="창닫기 ✕"
          onClick={stopSeenToday} // Close the image
        />
      </div>
    </div>
  );
}
