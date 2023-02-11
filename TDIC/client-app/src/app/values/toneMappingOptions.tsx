import { ACESFilmicToneMapping, LinearToneMapping, NoToneMapping } from "three";

  export const toneMappingOptions = [
    {
      id: 'None',
      selectorname: 'None',
      value: NoToneMapping,
    },
    {
      id: 'LinearToneMapping',
      selectorname: 'Linear',
      value: LinearToneMapping,
    },
    {
      id: 'ACESFilmicToneMapping',
      selectorname: 'ACES Filmic',
      value: ACESFilmicToneMapping,
    }
  ];