import React from 'react'
import GalleryHero from './GalleryHero'
import GalleryFilter from './GalleryFilter'
import GalleryGrid from './GalleryGrid'
import GalleryViewer from './GalleryViewer'

const Gallery = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <GalleryHero />
      <GalleryFilter />
      <GalleryGrid />
      <GalleryViewer />
    </div>
  )
}

export default Gallery