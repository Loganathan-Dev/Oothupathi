import React from 'react'
import CustomizeHero from './CustomizeHero'
import ProductStep from './ProductStep'
import RequirementsStep from './RequirementsStep'
import QuantityStep from './QuantityStep'
import PackagingStep from './PackagingStep'
import BrandingStep from './BrandingStep'
import UploadStep from './UploadStep'
import ReviewStep from './ReviewStep'

const Customize = () => {
  return (
    <div>
      <CustomizeHero />
      <ProductStep />
      <RequirementsStep />
      <QuantityStep />
      <PackagingStep />
      <BrandingStep />
      <UploadStep />
      <ReviewStep />
    </div>
  );
};

export default Customize;