import { useEffect } from 'react';
import styles from './App.module.css'
import { EditorType } from "./Entities/SelectionType";
import { SlideCollection } from "./view/SlideCollection";
import { TopPanel } from './view/TopPanel/TopPanel';
import { Workspace } from "./view/Workspace";

type AppProps = {
  editor: EditorType,
}

function App({editor}: AppProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
        document.body.style.overflow = "scroll"
    };
  }, []);

  const selectedSlideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == editor.selectionSlide.selectedSlideId)

  return (
      <>
        <TopPanel title={editor.presentation.name}></TopPanel>
        <div className={styles.container}>
          <SlideCollection slideList={editor.presentation.listSlides} selection={editor.selectionSlide} editor={editor}/>
          <Workspace slide={editor.presentation.listSlides[selectedSlideIndex]} selection={editor.selectionObject}/>
        </div>
      </>
  )
}

export default App
