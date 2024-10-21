export type TIconName =
  | 'arrow'
  | 'mail'
  | 'edit'
  | 'logout'
  | 'group'
  | 'flag'
  | 'case'
  | 'calendar'
  | 'shoppingBag'
  | 'delete'
  | 'pin'
  | 'eye'
  | 'eyeOff'
  | 'check'
  | 'status'
  | 'warning'
  | 'user'
  | 'plus'
  | 'chevronsLeft'
  | 'chevronsRight'
  | 'chevronLeft'
  | 'chevronRight'
  | 'selector'
  | 'menu'
  | 'close'
  | 'search'
  | 'note'
  | 'options'
  | 'sort'
  | 'userGroup'
  | 'clock'
  | 'copy'
  | 'chevronDown'
  | 'facebook'
  | 'google'
  | 'event'
  | 'info'
  | 'instagram'
  | 'share'
  | 'grayInstagram'
  | 'grayTwitter'
  | 'grayFacebook'
  | 'shop'
  | 'list'
  | 'grid'
  | 'facebookShare'
  | 'pinterest'
  | 'twitter'
  | 'whatsapp'
  | 'linkedin'

export type TIconElement = React.FunctionComponent<React.SVGAttributes<SVGElement>>

export type TIconConfig = Record<TIconName, TIconElement>
