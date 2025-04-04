import MenuTagItem from './MenuTagItem';

export default function MenuTagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1">
      {tags.map((label, idx) => (
        <MenuTagItem key={idx} label={label} />
      ))}
    </ul>
  );
}
