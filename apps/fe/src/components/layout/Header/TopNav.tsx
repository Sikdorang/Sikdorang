"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "카테고리 관리", path: "/category" },
    { name: "메뉴 관리", path: "/menu" },
    { name: "미리보기", path: "/preview" },
    // { name: "순서 관리", path: "/order" },
];

export default function TopNav() {
    const pathname = usePathname();

    const userName = "지화자"; // 사용자 이름

    return (
        <nav className="bg-white fixed top-0 left-0 w-full shadow-md z-50 border-b border-gray-200">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-xl font-bold text-gray-800">
                    <Link href="/">식도랑 관리자</Link>
                </div>
                <div className="flex space-x-4">
                    <ul className="flex space-x-4">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === item.path
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* 사용자 환영 메시지 */}
                    <div className="flex text-sm font-medium text-gray-700 ml-4 justify-center items-center">
                        어서오세요, <span className="font-bold text-gray-900">{userName}</span>님!
                    </div>
                </div>
            </div>

        </nav>
    );
}
