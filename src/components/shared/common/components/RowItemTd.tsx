export function RowItemTd({
  content,
  rowSpan,
}: {
  content: string;
  rowSpan?: number;
}) {
  return (
    <td
      className="border border-[#676767] bg-[#a5a5a5] p-2 text-center"
      rowSpan={rowSpan}
    >
      {content}
    </td>
  );
}
