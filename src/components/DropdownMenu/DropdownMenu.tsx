import React, { useState, useRef } from 'react'
import styles from './DropdownMenu.module.css'

type MenuItem = {
    label: string;
    onClick: () => void;
};

type DropdownMenuProps = {
    items: MenuItem[];
    label: string;
};

const DropdownMenu = ({ items, label }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    // Закрытие меню при клике вне его
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} className={styles.dropdown_container}>
            <button onClick={toggleMenu} className={styles.dropdown_button}>
                {label}
            </button>
            {isOpen && (
                <ul className={styles.dropdown_menu}>
                    {items.map((item, index) => (
                        <li key={index} className={styles.dropdown_item} onClick={item.onClick}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export {
    DropdownMenu
};
