const Materials = require('Materials');

export const pictureMaterials = [
    {
        picture: Materials.findFirst('ochpocmakMaterial'),
        recipe: Materials.findFirst('ochpochmakRecipeMaterial'),
        accept: true
    },
    {
        picture: Materials.findFirst('chakchakMaterial'),
        recipe: Materials.findFirst('chakchakRecipeMaterial'),
        accept: true
    },
    {
        picture: Materials.findFirst('peremechMaterial'),
        recipe: Materials.findFirst('peremechRecipeMaterial'),
        accept: false
    },
    {
        picture: Materials.findFirst('gubadiyaMaterial'),
        recipe: Materials.findFirst('gubadiyaRecipeMaterial'),
        accept: true
    }
];

export const rightMaterial = Materials.findFirst('rightMaterial');
export const wrongMaterial = Materials.findFirst('wrongMaterial');
export const transparentMaterial = Materials.findFirst('transparentMaterial');

export function setMaterial(planeValue, materialValue) {
    planeValue.then(function (plane) {
        if (materialValue) {
            materialValue.then(function (material) {
                plane.material = material;
            });
        }
    });
}
