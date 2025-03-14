import { cn } from '@/lib/utils';
import React from 'react'
import Image from 'next/image';
import BookCoverSvg from './BookCoverSvg';

type BookCovervariant = 'extraSmall' | 'small' | 'medium' | 'large' | 'wide';

const variantStyles: Record<BookCovervariant, string> = {
  extraSmall: 'book-cover_extra_small',
  small: 'book-cover_small',
  medium: 'book-cover_medium',
  large: 'book-cover_large',
  wide: 'book-cover_wide',
};

interface Props {
  className?: string;
  variant?: BookCovervariant;
  coverColor?: string;
  coverUrl: string;
}

const BookCover = ({className, variant="medium", coverColor="#012B48", coverUrl="https://placehold.co/400x600.png"}: Props) => {
  return (
    <div className={cn("relative transition-all duration-300", variantStyles[variant], className )}>
      < BookCoverSvg coverColor={coverColor} />
      <div className="absolute z-10" style={{left: '12%', width: '87.5%', height: "88%"}}>
      <Image 
          src={coverUrl} 
          alt="book-cover" 
          fill 
          className="rounded-sm object-fill"
          unoptimized={coverUrl.startsWith('http')} // Add this for external images
        />      
        </div>
    </div>
  )
}

export default BookCover;
