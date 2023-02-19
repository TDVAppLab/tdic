import { Vector3 } from 'three';
import { Html } from "@react-three/drei"
import "./styles.css"
import { Annotation } from '../../../../../app/models/Annotation';
import { AnnotationDisplay } from '../../../../../app/models/AnnotationDisplay';
import React from 'react';


interface Props {
    annotationMap : Map<number, Annotation>;
    annotationDisplayMap : Map<number, AnnotationDisplay>;
    selectedAnnotationId : number | undefined;
}


const ShowAnnotation  = ({annotationMap, annotationDisplayMap, selectedAnnotationId}: Props) => {
  
  return (
        <>
        {
          Array.from(annotationMap.values()).map(annotation=>(
            (annotationDisplayMap.get(annotation.id_annotation)?.is_display ||annotation.id_annotation === selectedAnnotationId)
              && <SowAnnotationSub annotation={annotation} isDisplayDescription = {annotationDisplayMap.get(annotation.id_annotation)?.is_display_description ? annotationDisplayMap.get(annotation.id_annotation)!.is_display_description : false} isSelected = {annotation.id_annotation === selectedAnnotationId} key={annotation.id_annotation} />
          ))          
        }
        { annotationMap.get(selectedAnnotationId ? selectedAnnotationId : 0) && <axesHelper args={[1]} position = {[annotationMap.get(selectedAnnotationId!)?.pos_x!,annotationMap.get(selectedAnnotationId!)?.pos_y!,annotationMap.get(selectedAnnotationId!)?.pos_z!]} /> }
        </>
    )
}


interface SubProps {
  annotation : Annotation;
  isDisplayDescription : boolean;
  isSelected : boolean;

}


const SowAnnotationSub = ({annotation, isDisplayDescription, isSelected} : SubProps) => {

  return (
    <React.Fragment>
      <Html
        className={ 
          `model-annotation `
          + (isDisplayDescription ? `model-annotation-displaytext ` : `` ) 
          + (isSelected ? `model-annotation annotation_editmode ` : `` )
        }
        position={new Vector3(annotation.pos_x+0.5,annotation.pos_y+0.5,annotation.pos_z+0.5)}
      >
        <div
        >
          <h4>{annotation.title}</h4>                
          {(isDisplayDescription || isSelected) && <>{annotation.description1}</>}
        </div>
      </Html>      
      <arrowHelper args={[new Vector3( -0.5, -0.5, -0.5 ).normalize(), new Vector3(annotation.pos_x+0.5,annotation.pos_y+0.5,annotation.pos_z+0.5),Math.sqrt(0.5*0.5*3), "red"]} />            
    </React.Fragment>
  )
}






export default ShowAnnotation;