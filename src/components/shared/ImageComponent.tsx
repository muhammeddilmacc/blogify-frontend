import Image from 'next/image';

interface ImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

export default function CustomImage({ src, alt, width, height, className }: ImageProps) {
    const fallbackImageUrl = "https://images.unsplash.com/photo-1547555999-14e818e09e33?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <Image
            src={src || fallbackImageUrl}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackImageUrl;
            }}
            priority={true}
        />
    );
} 