import * as SlideActionCreators from './SlideActionCreators'
import * as SelectionActionCreators from './SelectionActionCreators'
import * as EditorActionCreators from './EditorActionCreators'
import * as PresentationActionCreators from './PresentationActionCreators'

export default {
    ...SlideActionCreators,
    ...SelectionActionCreators,
    ...EditorActionCreators,
    ...PresentationActionCreators,
}