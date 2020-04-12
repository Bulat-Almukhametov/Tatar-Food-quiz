const Materials = require('Materials');

export const pictureMaterials = [
    Materials.findFirst('ochpocmakMaterial'),
    Materials.findFirst('chakchakMaterial')
];

export const recipeMaterials = [
    Materials.findFirst('ochpochmakRecipeMaterial'),
    Materials.findFirst('chakchakRecipeMaterial')
];

export const rightMaterial = Materials.findFirst('rightMaterial');
export const wrongMaterial = Materials.findFirst('wrongMaterial');
export const transparentMaterial = Materials.findFirst('transparentMaterial');
