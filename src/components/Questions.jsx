import fluidosImg from '../../public/assets/images/fluidos.png';
import seguridadImg from '../../public/assets/images/seguridad.png';
export const Questions = [
  {
      "name": "Seguridad",
      "path": seguridadImg,
      "questions": [
          {
              "id": 14,
              "statement": "Ingrese el kilometraje actual de su vehículo",
              "section": "Seguridad",
              "type": "N"
          },
          {
              "id": 18,
              "statement": "Indique a continuación si ya alineo los espejos de su vehículo.",
              "section": "Seguridad",
              "type": "SA",
              "answerOptions": [
                  {
                      "id": 1,
                      "statement": "si"
                  },
                  {
                      "id": 2,
                      "statement": "no"
                  }
              ]
          },
          {
              "id": 19,
              "statement": "¿Tiene alguna anotación? Comentela:",
              "section": "Seguridad",
              "type": "O"
          }
      ]
  },
  {
      "name": "Fluidos",
      "path": fluidosImg,
      "questions": [
          {
              "id": 15,
              "statement": "Revise el nivel de aceite de su motor y desplace el indicador representando la medida de la bayoneta.",
              "section": "Fluidos",
              "type": "S"
          },
          {
              "id": 16,
              "statement": "Revise el nivel de agua del motor y desplace el indicador representando la medida.",
              "section": "Fluidos",
              "type": "S"
          },
          {
              "id": 17,
              "statement": "Revise el nivel de líquido de frenos y desplace el indicador representando la medida.",
              "section": "Fluidos",
              "type": "S"
          }
      ]
  }
];