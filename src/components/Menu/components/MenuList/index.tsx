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
              href={`/${tag.name}`}
              onClick={handleSelect}
              className={`${
                selected === tag.name
                  ? 'font-bold text-black'
                  : 'font-thin text-black'
              } hover:text-gray-400`}
            >
              {tag.name}
            </Link>
          </li>
        ))}
      <li>
        <div className="font-light text-black">Contato</div>
      </li>
    </ul>
  );
};
