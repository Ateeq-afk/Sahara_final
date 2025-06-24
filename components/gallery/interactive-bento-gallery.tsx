"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, Eye, ArrowRight } from 'lucide-react'
import Image from 'next/image'

// MediaItemType defines the structure of a media item
interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
    category: string;
    location: string;
    year: string;
    area: string;
    features: string[];
}

// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);

    // Intersection Observer to detect if video is in view and play/pause accordingly
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting);
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    // Handle video play/pause based on whether the video is in view or not
    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return;

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play();
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve;
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <Image
            src={item.url}
            alt={item.title}
            fill
            className={`${className} object-cover cursor-pointer`}
            onClick={onClick}
            loading="lazy"
        />
    );
};

// GalleryModal component displays the selected media item in a modal
interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[];
}

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Main Modal */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }}
                className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
            >
                <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
                    {/* Close Button */}
                    <motion.button
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
                        onClick={onClose}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X className="w-6 h-6" />
                    </motion.button>

                    {/* Content */}
                    <div className="h-full flex flex-col lg:flex-row">
                        {/* Image/Video Section */}
                        <div className="flex-1 relative bg-gray-100">
                            <MediaItem item={selectedItem} className="w-full h-full" />
                        </div>

                        {/* Details Section */}
                        <div className="w-full lg:w-96 p-6 lg:p-8 bg-white overflow-y-auto">
                            <div className="space-y-6">
                                {/* Category Badge */}
                                <div className="flex items-center gap-2">
                                    <span className="inline-block bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                                        {selectedItem.category}
                                    </span>
                                    <span className="text-sm text-gray-500">{selectedItem.year}</span>
                                </div>

                                {/* Title */}
                                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900">
                                    {selectedItem.title}
                                </h2>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed">
                                    {selectedItem.desc}
                                </p>

                                {/* Location & Area */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        <span className="text-sm">{selectedItem.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span className="text-sm">{selectedItem.area}</span>
                                    </div>
                                </div>

                                {/* Features */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {selectedItem.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-primary rounded-full" />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Thumbnails */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-center gap-2 bg-black/20 backdrop-blur-sm rounded-xl p-3">
                            {mediaItems.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => setSelectedItem(item)}
                                    className={`relative w-16 h-12 rounded-lg overflow-hidden ${
                                        selectedItem.id === item.id ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <MediaItem item={item} className="w-full h-full" />
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Header */}
            <div className="mb-12 text-center">
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-600 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {description}
                </motion.p>
            </div>
            
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={mediaItems}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer bg-gray-100"
                                onClick={() => setSelectedItem(item)}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                variants={{
                                    hidden: { y: 50, scale: 0.9, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 25,
                                            delay: index * 0.05
                                        }
                                    }
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Image */}
                                <MediaItem
                                    item={item}
                                    className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* Content */}
                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ 
                                        opacity: hoveredItem === item.id ? 1 : 0,
                                        y: hoveredItem === item.id ? 0 : 20
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="inline-block bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-white/80">{item.year}</span>
                                    </div>
                                    
                                    <h3 className="text-white text-lg font-serif font-semibold mb-2">
                                        {item.title}
                                    </h3>
                                    
                                    <p className="text-white/90 text-sm mb-3 line-clamp-2">
                                        {item.desc}
                                    </p>
                                    
                                    <div className="flex items-center gap-4 text-xs text-white/80 mb-3">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            <span className="truncate">{item.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>{item.area}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center text-white text-sm font-medium">
                                        <Eye className="h-4 w-4 mr-2" />
                                        <span>View Details</span>
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </motion.div>

                                {/* Quick View Icon */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                        <Eye className="h-4 w-4 text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBentoGallery