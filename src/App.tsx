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

  const selectedObjectIndex = editor.presentation.listSlides.findIndex(slide => slide.id == editor.selection.selectedSlideById)

  return (
      <>
        <TopPanel title={editor.presentation.name}></TopPanel>
        <div className={styles.container}>
          <SlideCollection slideList={editor.presentation.listSlides} selection={editor.selection} />
          <Workspace slide={editor.presentation.listSlides[selectedObjectIndex]} />
        </div>
      </>
  )
}

export default App
