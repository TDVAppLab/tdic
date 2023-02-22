import { Matrix4, Vector3 } from 'three';
import { Html, PivotControls } from "@react-three/drei"
import "./styles.css"
import { Annotation } from '../../../../../app/models/Annotation';
import { AnnotationDisplay } from '../../../../../app/models/AnnotationDisplay';
import React, { useEffect, useState } from 'react';


interface Props {
    annotationMap : Map<number, Annotation>;
    annotationDisplayMap : Map<number, AnnotationDisplay>;
    selectedAnnotationId : number | undefined;
    setSelectedAnnotationPosMoved: (selectedAnnotationPosMoved: Vector3) => void;
}


const ShowAnnotation  = ({annotationMap, annotationDisplayMap, selectedAnnotationId, setSelectedAnnotationPosMoved}: Props) => {
  const [matrix, setMatrix] = useState<Matrix4>();

  
  useEffect(()=> {
    const m = new Matrix4();

    m.set
       (1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1);

    setMatrix(m);

  }, [selectedAnnotationId, annotationMap.get(selectedAnnotationId ? selectedAnnotationId : 0)])
  
  return (
    
        <>
        {
          Array.from(annotationMap.values()).map(annotation=>(
            (annotation.id_annotation === selectedAnnotationId) ?
            
            <PivotControls anchor={[0,0,0,]} depthTest={true} scale={1} lineWidth={2} offset={[0,0,0]} matrix={matrix}
              onDrag={(l,deltaL,w,deltaW) => {const v = new Vector3(); setSelectedAnnotationPosMoved(v.setFromMatrixPosition(w))}}
              key={annotation.id_annotation}
            >
              <SowAnnotationSub annotation={annotation} isDisplayDescription = {annotationDisplayMap.get(annotation.id_annotation)?.is_display_description ? annotationDisplayMap.get(annotation.id_annotation)!.is_display_description : false} isSelected = {annotation.id_annotation === selectedAnnotationId}  key={annotation.id_annotation} />
            </PivotControls>
            :
            (annotationDisplayMap.get(annotation.id_annotation)?.is_display ||annotation.id_annotation === selectedAnnotationId)
              && <SowAnnotationSub annotation={annotation} isDisplayDescription = {annotationDisplayMap.get(annotation.id_annotation)?.is_display_description ? annotationDisplayMap.get(annotation.id_annotation)!.is_display_description : false} isSelected = {annotation.id_annotation === selectedAnnotationId} key={annotation.id_annotation} />
          ))          
        }
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
    //<group position={[annotation.pos_x,annotation.pos_y,annotation.pos_z]}>
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
    //</group>
  )
}






export default ShowAnnotation;