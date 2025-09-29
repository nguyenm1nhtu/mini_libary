'use client';

import React from 'react';
import style from './Search.module.css';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(undefined);

    return (
        <>
            <div className={style.searchContainer}>
                <form className={style.searchForm}>
                    <div className="flex-1 pl-[14px]">
                        <input
                            type="text"
                            className="text-[14px] border-none outline-none w-full h-full"
                            placeholder="Nhập tiêu đề sách hoặc tên tác giả bạn cần tìm..."
                        />
                    </div>

                    <div className={style.divider}></div>

                    <div className="rounded-[15px] w-[30%] h-full hover:bg-[#f2f4f5]">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className={style.selectTrigger}>
                                <div className="flex items-center gap-[8px]">
                                    <FontAwesomeIcon icon={faListUl} className="font-[14px]" />
                                    <SelectValue placeholder="Danh mục" className="text-black font-[14px]" />
                                </div>
                            </SelectTrigger>
                            <SelectContent sideOffset={2}>
                                <SelectItem className={style.selectItem} value="fiction">
                                    Tiểu thuyết
                                </SelectItem>
                                <SelectItem className={style.selectItem} value="non-fiction">
                                    Phi hư cấu
                                </SelectItem>
                                <SelectItem className={style.selectItem} value="science">
                                    Khoa học
                                </SelectItem>
                                <SelectItem className={style.selectItem} value="history">
                                    Lịch sử
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={style.divider}></div>

                    <button className={style.searchBtn} type="submit">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
            </div>
        </>
    );
}
