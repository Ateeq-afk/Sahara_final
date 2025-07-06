"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, Eye, ArrowRight, Building, Home, Palette, Wrench } from 'lucide-react'
import Image from 'next/image'

// Portfolio item type definition
interface PortfolioItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    category: string;
    location: string;
    year: string;
    area: string;
    features: string[];
    projectType: string;
}

// MediaItem component for rendering images/videos
const MediaItem = ({ item, className, onClick }: { item: PortfolioItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);

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
                // Video playback failed, silently handle
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

// Portfolio Modal component
interface PortfolioModalProps {
    selectedItem: PortfolioItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: PortfolioItemType | null) => void;
    portfolioItems: PortfolioItemType[];
}

const PortfolioModal = ({ selectedItem, isOpen, onClose, setSelectedItem, portfolioItems }: PortfolioModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

    if (!isOpen) return null;

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Residential': return Home;
            case 'Commercial': return Building;
            case 'Interior': return Palette;
            case 'Renovation': return Wrench;
            default: return Building;
        }
    };

    const CategoryIcon = getCategoryIcon(selectedItem.category);

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
                onClick={onClose}
            />

            {/* Main Modal */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }}
                className="fixed inset-4 md:inset-8 lg:inset-12 z-50 flex items-center justify-center"
            >
                <div className="relative w-full h-full max-w-7xl max-h-[95vh] bg-white rounded-3xl overflow-hidden shadow-2xl">
                    {/* Close Button */}
                    <motion.button
                        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
                        onClick={onClose}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X className="w-6 h-6" />
                    </motion.button>

                    {/* Content */}
                    <div className="h-full flex flex-col lg:flex-row">
                        {/* Image/Video Section */}
                        <div className="flex-1 relative bg-gray-900">
                            <MediaItem item={selectedItem} className="w-full h-full" />
                            
                            {/* Project Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full">
                                        <CategoryIcon className="h-4 w-4" />
                                        <span className="text-sm font-medium">{selectedItem.category}</span>
                                    </div>
                                    <span className="text-sm text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                                        {selectedItem.year}
                                    </span>
                                </div>
                                
                                <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-3">
                                    {selectedItem.title}
                                </h2>
                                
                                <p className="text-white/90 text-lg leading-relaxed mb-4 max-w-2xl">
                                    {selectedItem.desc}
                                </p>
                                
                                <div className="flex items-center gap-6 text-white/80">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        <span>{selectedItem.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        <span>{selectedItem.area}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Sidebar */}
                        <div className="w-full lg:w-96 xl:w-[28rem] p-6 lg:p-8 bg-white overflow-y-auto">
                            <div className="space-y-8">
                                {/* Project Type */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Type</h3>
                                    <p className="text-gray-600">{selectedItem.projectType}</p>
                                </div>

                                {/* Key Features */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {selectedItem.features.map((feature, idx) => (
                                            <motion.div 
                                                key={idx} 
                                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                                <span className="text-gray-700 font-medium">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-primary/5 p-4 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-primary mb-1">{selectedItem.year}</div>
                                        <div className="text-sm text-gray-600">Completed</div>
                                    </div>
                                    <div className="bg-primary/5 p-4 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-primary mb-1">{selectedItem.area}</div>
                                        <div className="text-sm text-gray-600">Total Area</div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <motion.button
                                    className="w-full bg-primary hover:bg-primary-dark text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Start Similar Project</span>
                                    <ArrowRight className="h-5 w-5" />
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Draggable Navigation Dock */}
                    <motion.div
                        drag
                        dragMomentum={false}
                        dragElastic={0.1}
                        initial={false}
                        animate={{ x: dockPosition.x, y: dockPosition.y }}
                        onDragEnd={(_, info) => {
                            setDockPosition(prev => ({
                                x: prev.x + info.offset.x,
                                y: prev.y + info.offset.y
                            }));
                        }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 touch-none z-10"
                    >
                        <motion.div
                            className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl cursor-grab active:cursor-grabbing"
                        >
                            <div className="flex items-center gap-2 px-4 py-3">
                                {portfolioItems.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedItem(item);
                                        }}
                                        className={`relative w-12 h-12 rounded-xl overflow-hidden transition-all ${
                                            selectedItem.id === item.id 
                                                ? 'ring-2 ring-white shadow-lg scale-110' 
                                                : 'hover:ring-2 hover:ring-white/50 hover:scale-105'
                                        }`}
                                        whileHover={{ y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <MediaItem item={item} className="w-full h-full" />
                                        {selectedItem.id === item.id && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute -inset-1 bg-white/30 blur-md rounded-xl"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

// Main Portfolio Gallery Component
interface PortfolioInteractiveGalleryProps {
    portfolioItems: PortfolioItemType[]
    title: string
    description: string
}

const PortfolioInteractiveGallery: React.FC<PortfolioInteractiveGalleryProps> = ({ 
    portfolioItems, 
    title, 
    description 
}) => {
    const [selectedItem, setSelectedItem] = useState<PortfolioItemType | null>(null);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            {/* Header */}
            <div className="mb-16 text-center">
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {title}
                </motion.h1>
                <motion.p
                    className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {description}
                </motion.p>
            </div>
            
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <PortfolioModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        portfolioItems={portfolioItems}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.08 }
                            }
                        }}
                    >
                        {portfolioItems.map((item, index) => {
                            const CategoryIcon = item.category === 'Residential' ? Home :
                                               item.category === 'Commercial' ? Building :
                                               item.category === 'Interior' ? Palette : Wrench;

                            return (
                                <motion.div
                                    key={item.id}
                                    className="group relative aspect-[4/3] overflow-hidden rounded-3xl cursor-pointer bg-gray-100 shadow-lg hover:shadow-2xl transition-shadow duration-500"
                                    onClick={() => setSelectedItem(item)}
                                    onMouseEnter={() => setHoveredItem(item.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    variants={{
                                        hidden: { y: 60, scale: 0.9, opacity: 0 },
                                        visible: {
                                            y: 0,
                                            scale: 1,
                                            opacity: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 25,
                                                delay: index * 0.05
                                            }
                                        }
                                    }}
                                    whileHover={{ scale: 1.03, y: -8 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Image */}
                                    <MediaItem
                                        item={item}
                                        className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    {/* Content Overlay */}
                                    <motion.div
                                        className="absolute inset-0 flex flex-col justify-end p-6"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ 
                                            opacity: hoveredItem === item.id ? 1 : 0,
                                            y: hoveredItem === item.id ? 0 : 30
                                        }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        {/* Category Badge */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-full">
                                                <CategoryIcon className="h-3 w-3" />
                                                <span className="text-xs font-medium">{item.category}</span>
                                            </div>
                                            <span className="text-xs text-white/80 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                                                {item.year}
                                            </span>
                                        </div>
                                        
                                        {/* Title */}
                                        <h3 className="text-white text-xl font-serif font-bold mb-2 leading-tight">
                                            {item.title}
                                        </h3>
                                        
                                        {/* Description */}
                                        <p className="text-white/90 text-sm mb-4 line-clamp-2 leading-relaxed">
                                            {item.desc}
                                        </p>
                                        
                                        {/* Location & Area */}
                                        <div className="flex items-center gap-4 text-xs text-white/80 mb-4">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                <span className="truncate">{item.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>{item.area}</span>
                                            </div>
                                        </div>
                                        
                                        {/* View Details Button */}
                                        <div className="flex items-center text-white text-sm font-semibold">
                                            <Eye className="h-4 w-4 mr-2" />
                                            <span>View Project Details</span>
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </motion.div>

                                    {/* Quick View Icon */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2.5">
                                            <Eye className="h-4 w-4 text-white" />
                                        </div>
                                    </div>

                                    {/* Hover Border Effect */}
                                    <div className="absolute inset-0 rounded-3xl ring-2 ring-primary/0 group-hover:ring-primary/30 transition-all duration-300" />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PortfolioInteractiveGallery;