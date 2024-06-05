import { Tag } from '@/@types/tag';
import { capitalizeFirstLetter } from '@/util/capitalize';
import Link from 'next/link';

interface MenuListProps {
  tags: Tag[];
  selected: string;
  handleSelect: (event: any) => void;
}
export const MenuList = ({ tags, selected, handleSelect }: MenuListProps) => {
  return (
    <ul className="flex flex-col gap-4 text-sm">
      {tags.map.length > 0 &&
        tags.map((tag) => (
          <li key={tag._id}>
            <Link
              href={`/photos/${tag.name}`}
              onClick={handleSelect}
              className={
                selected === capitalizeFirstLetter(tag.name)
                  ? 'font-bold text-black'
                  : 'text-black'
              }
            >
              {capitalizeFirstLetter(tag.name)}
            </Link>
          </li>
        ))}
      <li>
        <div
          className={
            selected === 'Contact' ? 'font-bold text-black' : 'text-black'
          }
        >
          Contact
        </div>
      </li>
    </ul>
  );
};
