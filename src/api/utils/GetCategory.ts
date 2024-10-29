export const getCategoryDisplayName = (category: string | string[]) => {
  switch (category) {
    case 'lipstick':
      return 'Lipstick'
    case 'lip_gloss':
      return 'Lip Gloss'
    case 'myx_bundles':
      return 'MYX Bundles'
    case 'lip_scrubs':
      return 'Lip Scrubs'
    case 'makeup_bags':
      return 'Makeup Bags'
    case 'gift_cards':
      return 'Gift Cards'
    default:
      return 'Unknown Category'
  }
}
