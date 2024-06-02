import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { useAppSelector } from 'app/store/storeHooks';
import { IAINoContentFallback } from 'common/components/IAIImageFallback';
import type { Dimensions } from 'features/canvas/store/canvasTypes';
import { ImageComparisonHover } from 'features/gallery/components/ImageViewer/ImageComparisonHover';
import { ImageComparisonSideBySide } from 'features/gallery/components/ImageViewer/ImageComparisonSideBySide';
import { ImageComparisonSlider } from 'features/gallery/components/ImageViewer/ImageComparisonSlider';
import { selectGallerySlice } from 'features/gallery/store/gallerySlice';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PiImagesBold } from 'react-icons/pi';

const selector = createMemoizedSelector(selectGallerySlice, (gallerySlice) => {
  const firstImage = gallerySlice.selection.slice(-1)[0] ?? null;
  const secondImage = gallerySlice.imageToCompare;
  return { firstImage, secondImage };
});

type Props = {
  containerDims: Dimensions;
};

export const ImageComparison = memo(({ containerDims }: Props) => {
  const { t } = useTranslation();
  const comparisonMode = useAppSelector((s) => s.gallery.comparisonMode);
  const { firstImage, secondImage } = useAppSelector(selector);

  if (!firstImage || !secondImage) {
    // Should rarely/never happen - we don't render this component unless we have images to compare
    return <IAINoContentFallback label={t('gallery.selectAnImageToCompare')} icon={PiImagesBold} />;
  }

  if (comparisonMode === 'slider') {
    return <ImageComparisonSlider containerDims={containerDims} firstImage={firstImage} secondImage={secondImage} />;
  }

  if (comparisonMode === 'side-by-side') {
    return (
      <ImageComparisonSideBySide containerDims={containerDims} firstImage={firstImage} secondImage={secondImage} />
    );
  }

  if (comparisonMode === 'hover') {
    return <ImageComparisonHover containerDims={containerDims} firstImage={firstImage} secondImage={secondImage} />;
  }
});

ImageComparison.displayName = 'ImageComparison';