'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownOption {
    value: string;
    label: string;
}

interface CustomDropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    variant?: 'default' | 'hero' | 'admin';
}

export function CustomDropdown({
    options,
    value,
    onChange,
    placeholder = 'Pilih...',
    className,
    variant = 'default'
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleSelect = (optValue: string) => {
        onChange(optValue);
        setIsOpen(false);
    };

    const styles = {
        default: {
            trigger: "bg-white border border-fog-300 hover:border-pine-500 px-4 py-3",
            text: "text-fog-800",
            placeholder: "text-fog-500",
        },
        hero: {
            trigger: "bg-transparent",
            text: "text-fog-800 font-medium",
            placeholder: "text-fog-500 font-medium",
        },
        admin: {
            trigger: "bg-white border border-fog-300 hover:border-pine-500 px-4 py-3",
            text: "text-fog-800",
            placeholder: "text-fog-500",
        }
    };

    const style = styles[variant];

    return (
        <div ref={dropdownRef} className={cn("relative", className)}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between gap-2 rounded-xl transition-all text-left focus:outline-none",
                    style.trigger
                )}
            >
                <span className={cn("truncate", selectedOption ? style.text : style.placeholder)}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-200 shrink-0",
                    isOpen && "rotate-180",
                    selectedOption ? style.text : style.placeholder
                )} />
            </button>

            {/* Dropdown Menu - Simple CSS-based positioning */}
            {isOpen && (
                <div
                    className="absolute z-[9999] top-full left-0 right-0 mt-2 bg-white border border-fog-200 rounded-xl overflow-hidden shadow-2xl"
                    style={{ minWidth: '200px' }}
                >
                    <div className="max-h-64 overflow-y-auto py-1">
                        {options.map((option) => {
                            const isSelected = option.value === value;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-4 py-3 text-left transition-colors text-sm",
                                        isSelected
                                            ? "bg-pine-50 text-pine-700 font-medium"
                                            : "text-fog-700 hover:bg-fog-50"
                                    )}
                                >
                                    <span className="truncate">{option.label}</span>
                                    {isSelected && (
                                        <Check className="w-4 h-4 text-pine-600 shrink-0 ml-2" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
