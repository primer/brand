import {ResizeObserver} from '@juggle/resize-observer'
import './mocks/popover-polyfill'
import 'jest-axe/extend-expect'

global.ResizeObserver = ResizeObserver
