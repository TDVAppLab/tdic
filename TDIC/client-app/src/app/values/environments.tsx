import { LinearEncoding, sRGBEncoding } from "three";

export const environments = [
    {
      id: '',
      name: 'None',
      path: null,
    },
    {
      id: 'neutral', // THREE.RoomEnvironment
      name: 'Neutral',
      path: null,
    },
    {
      id: 'venice-sunset',
      name: 'Venice Sunset',
      path: 'https://storage.googleapis.com/donmccurdy-static/venice_sunset_1k.exr',
      format: '.exr'
    },
    {
      id: 'footprint-court',
      name: 'Footprint Court (HDR Labs)',
      path: 'https://storage.googleapis.com/donmccurdy-static/footprint_court_2k.exr',
      format: '.exr'
    }
  ];
  

export const outputEncodingOptions = [
    {
      id: 'sRGBEncoding',
      selectorname: 'sRGB',
      value: sRGBEncoding,
    },
    {
      id: 'LinearEncoding',
      selectorname: 'Linear',
      value: LinearEncoding,
    }
  ];