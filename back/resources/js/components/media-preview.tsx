import React from 'react';

type Media = {
    id: number;
    url: string;
    type: 'image' | 'video' | 'document'; // adapte selon ton cas
};

interface MediaPreviewProps {
    media: Media;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ media }) => {
    if (media.type === 'image') {
        return (
            <img
                src={media.url}
                alt="media"
                className="object-cover w-full h-full"
            />
        );
    }

    if (media.type === 'video') {
        return (
            <video
                src={media.url}
                controls
                className="object-cover w-full h-full"
            />
        );
    }

    // Par défaut, pour les documents ou autres types
    return (
        <a
            href={media.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-full text-sm font-semibold text-blue-600 underline"
        >
            Voir le fichier
        </a>
    );
};

export default MediaPreview;
