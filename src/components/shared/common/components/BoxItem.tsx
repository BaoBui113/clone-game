import Image from "next/image";

export function BoxItem({
  img,
  title,
  ...props
}: {
  img: string;
  title: string;
  onClick?: () => void;
  className?: string | any;
  classNameTitle?: string | any;
  widthImg?: number;
}) {
  return (
    <div
      onClick={props.onClick}
      className={`flex cursor-pointer flex-col items-center justify-center gap-1 pb-3 transition-all delay-75 ease-linear ${props.className}`}
    >
      <Image
        src={img}
        alt={title}
        width={props.widthImg ? props.widthImg : 48}
        height={48}
        className="object-cover"
      />
      <div className={`text-sm whitespace-nowrap lg:text-base ${props.classNameTitle}`}>{title}</div>
    </div>
  );
}
