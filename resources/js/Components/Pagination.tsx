import { Link } from "@inertiajs/react";

interface LinkItem {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: LinkItem[];
}

export default function Pagination({ links }: PaginationProps) {
    if (!links || links.length <= 3) return null;

    return (
        <nav className="flex justify-center mt-4">
            <ul className="flex flex-wrap items-center space-x-2">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.url ?? "#"}
                            className={`px-4 py-2 text-sm rounded-lg transition-all duration-150 border 
                                ${link.active
                                    ? 'bg-green-600 text-white font-bold border-green-600 shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                                }
                                ${!link.url && 'opacity-50 cursor-not-allowed'}
                            `}
                            preserveScroll={true} 
                        >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}