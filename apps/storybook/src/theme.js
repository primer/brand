import {create} from '@storybook/theming/create'
import monaImage from './images/mona-recipes.png'

export default create({
  base: 'light',
  brandTitle: 'Primer Brand Storybook',
  brandImage: monaImage,
  brandTarget: '_self',
})
