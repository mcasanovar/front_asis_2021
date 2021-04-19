import { IFiltersGI } from "../models/gi.models";
import { ICategory1 } from "../models/request.models";

export const CANCEL = 'cancel';
export const CONFIRM = 'confirm';
export const OK = 'ok';
export const EDIT = 'edit';
export const FORMAT_DATE = 'YYYY-MM-DD';

export const N_PER_PAGE = 20;

//+++++++++++++++++++++++++++++++++++++ GI +++++++++++++++++++++++++
export const PREFIX_GIS = '/gi';

export const FILTERS_GI: IFiltersGI[] = [
  {
    key: 1,
    value: 'Rut',
  },
  {
    key: 2,
    value: 'Razon Social',
  },
  {
    key: 3,
    value: 'Grupo interes',
  }
]

export const ACTIVITY_DATA = [
  {
    codigo: "11101",
    actividad: "Cultivo de trigo",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11102",
    actividad: "Cultivo de maíz",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11103",
    actividad: "Cultivo de avena",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11104",
    actividad: "Cultivo de cebada",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11105",
    actividad:
      "Cultivo de otros cereales (excepto trigo, maíz, avena y cebada)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11106",
    actividad: "Cultivo de porotos",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11107",
    actividad: "Cultivo de lupino",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11108",
    actividad: "Cultivo de otras legumbres (excepto porotos y lupino)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11109",
    actividad: "Cultivo de semillas de raps",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11110",
    actividad: "Cultivo de semillas de maravilla (girasol)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11111",
    actividad:
      "Cultivo de semillas de cereales, legumbres y oleaginosas (excepto semillas de raps y maravilla)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11200",
    actividad: "Cultivo de arroz",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11301",
    actividad: "Cultivo de papas",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11302",
    actividad: "Cultivo de camotes",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11303",
    actividad: "Cultivo de otros tubérculos (excepto papas y camotes)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11304",
    actividad: "Cultivo de remolacha azucarera",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11305",
    actividad: "Cultivo de semillas de hortalizas",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11306",
    actividad: "Cultivo de hortalizas y melones",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11400",
    actividad: "Cultivo de caña de azúcar",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11500",
    actividad: "Cultivo de tabaco",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11600",
    actividad: "Cultivo de plantas de fibra",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11901",
    actividad: "Cultivo de flores",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11902",
    actividad:
      "Cultivos forrajeros en praderas mejoradas o sembradas; cultivos suplementarios forrajeros",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "11903",
    actividad:
      "Cultivos de semillas de flores; cultivo de semillas de plantas forrajeras",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12111",
    actividad:
      "Cultivo de uva destinada a la producción de pisco y aguardiente",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12112",
    actividad: "Cultivo de uva destinada a la producción de vino",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12120",
    actividad: "Cultivo de uva para mesa",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12200",
    actividad:
      "Cultivo de frutas tropicales y subtropicales (incluye el cultivo de paltas)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12300",
    actividad: "Cultivo de cítricos",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12400",
    actividad: "Cultivo de frutas de pepita y de hueso",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12501",
    actividad: "Cultivo de semillas de frutas",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12502",
    actividad: "Cultivo de otros frutos y nueces de árboles y arbustos",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12600",
    actividad:
      "Cultivo de frutos oleaginosos (incluye el cultivo de aceitunas)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12700",
    actividad:
      "Cultivo de plantas con las que se preparan bebidas (incluye el cultivo de café, té y mate)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12801",
    actividad: "Cultivo de especias",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12802",
    actividad: "Cultivo de plantas aromáticas, medicinales y farmacéuticas",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "12900",
    actividad: "Cultivo de otras plantas perennes",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "13000",
    actividad:
      "Cultivo de plantas vivas incluida la producción en viveros (excepto viveros forestales)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "14101",
    actividad: "Cría de ganado bovino para la producción lechera",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "14102",
    actividad:
      "Cría de ganado bovino para la producción de carne o como ganado reproductor",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "14200",
    actividad: "Cría de caballos y otros equinos",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "14300",
    actividad: "Cría de llamas, alpacas, vicuñas, guanacos y otros camélidos",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "14410",
    actividad: "Cría de ovejas (ovinos)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "14420",
    actividad: "Cría de cabras (caprinos)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "14500",
    actividad: "Cría de cerdos",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "14601",
    actividad: "Cría de aves de corral para la producción de carne",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "14602",
    actividad: "Cría de aves de corral para la producción de huevos",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "14901",
    actividad: "Apicultura",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "14909",
    actividad: "Cría de otros animales n.c.p.",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "15000",
    actividad:
      "Cultivo de productos agrícolas en combinación con la cría de animales (explotación mixta)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "16100",
    actividad: "Actividades de apoyo a la agricultura",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "16200",
    actividad: "Actividades de apoyo a la ganadería",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "16300",
    actividad: "Actividades poscosecha",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "16400",
    actividad: "Tratamiento de semillas para propagación",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "17000",
    actividad:
      "Caza ordinaria y mediante trampas y actividades de servicios conexas",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "21001",
    actividad: "Explotación de viveros forestales",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "21002",
    actividad:
      "Silvicultura y otras actividades forestales (excepto explotación de viveros forestales)",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "22000",
    actividad: "Extracción de madera",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "23000",
    actividad: "Recolección de productos forestales distintos de la madera",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "24001",
    actividad:
      "Servicios de forestación a cambio de una retribución o por contrata",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "24002",
    actividad:
      "Servicios de corta de madera a cambio de una retribución o por contrata",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "24003",
    actividad: "Servicios de extinción y prevención de incendios forestales",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "24009",
    actividad: "Otros servicios de apoyo a la silvicultura n.c.p.",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "31110",
    actividad: "Pesca marítima industrial, excepto de barcos factoría",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "31120",
    actividad: "Pesca marítima artesanal",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "31130",
    actividad: "Recolección y extracción de productos marinos",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "31140",
    actividad: "Servicios relacionados con la pesca marítima",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "31200",
    actividad: "Pesca de agua dulce",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "32110",
    actividad: "Cultivo y crianza de peces marinos",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "32120",
    actividad: "Cultivo, reproducción y manejo de algas marinas",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "32130",
    actividad: "Reproducción y cría de moluscos, crustáceos y gusanos marinos",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "32140",
    actividad: "Servicios relacionados con la acuicultura marina",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "32200",
    actividad: "Acuicultura de agua dulce",
    rubro: "Agricultura, ganadería, silvicultura y pesca",
  },
  {
    codigo: "40000",
    actividad: "Extracción y procesamiento de cobre",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "51000",
    actividad: "Extracción de carbón de piedra",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "52000",
    actividad: "Extracción de lignito",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "61000",
    actividad: "Extracción de petróleo crudo",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "62000",
    actividad: "Extracción de gas natural",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "71000",
    actividad: "Extracción de minerales de hierro",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "72100",
    actividad: "Extracción de minerales de uranio y torio",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "72910",
    actividad: "Extracción de oro y plata",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "72991",
    actividad: "Extracción de zinc y plomo",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "72992",
    actividad: "Extracción de manganeso",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "72999",
    actividad:
      "Extracción de otros minerales metalíferos no ferrosos n.c.p. (excepto zinc, plomo y manganeso)",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "81000",
    actividad: "Extracción de piedra, arena y arcilla",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "89110",
    actividad: "Extracción y procesamiento de litio",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "89190",
    actividad:
      "Extracción de minerales para la fabricación de abonos y productos químicos n.c.p.",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "89200",
    actividad: "Extracción de turba",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "89300",
    actividad: "Extracción de sal",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "89900",
    actividad: "Explotación de otras minas y canteras n.c.p.",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "91001",
    actividad:
      "Actividades de apoyo para la extracción de petróleo y gas natural prestados por empresas",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "91002",
    actividad:
      "Actividades de apoyo para la extracción de petróleo y gas natural prestados por profesionales",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "99001",
    actividad:
      "Actividades de apoyo para la explotación de otras minas y canteras prestados por empresas",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "99002",
    actividad:
      "Actividades de apoyo para la explotación de otras minas y canteras prestados por profesionales",
    rubro: "Explotación de minas y canteras",
  },
  {
    codigo: "101011",
    actividad:
      "Explotación de mataderos de bovinos, ovinos, equinos, caprinos, porcinos y camélidos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "101019",
    actividad:
      "Explotación de mataderos de aves y de otros tipos de animales n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "101020",
    actividad: "Elaboración y conservación de carne y productos cárnicos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "102010",
    actividad: "Producción de harina de pescado",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "102020",
    actividad: "Elaboración y conservación de salmónidos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "102030",
    actividad:
      "Elaboración y conservación de otros pescados, en plantas en tierra (excepto barcos factoría)",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "102040",
    actividad:
      "Elaboración y conservación de crustáceos, moluscos y otros productos acuáticos, en plantas en tierra",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "102050",
    actividad:
      "Actividades de elaboración y conservación de pescado, realizadas en barcos factoría",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "102060",
    actividad: "Elaboración y procesamiento de algas",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "103000",
    actividad: "Elaboración y conservación de frutas, legumbres y hortalizas",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "104000",
    actividad:
      "Elaboración de aceites y grasas de origen vegetal y animal (excepto elaboración de mantequilla)",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "105000",
    actividad: "Elaboración de productos lácteos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "106101",
    actividad: "Molienda de trigo: producción de harina, sémola y gránulos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "106102",
    actividad: "Molienda de arroz; producción de harina de arroz",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "106109",
    actividad: "Elaboración de otros productos de molinería n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "106200",
    actividad: "Elaboración de almidones y productos derivados del almidón",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "107100",
    actividad: "Elaboración de productos de panadería y pastelería",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "107200",
    actividad: "Elaboración de azúcar",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "107300",
    actividad: "Elaboración de cacao, chocolate y de productos de confitería",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "107400",
    actividad:
      "Elaboración de macarrones, fideos, alcuzcuz y productos farináceos similares",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "107500",
    actividad:
      "Elaboración de comidas y platos preparados envasados, rotulados y con información nutricional",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "107901",
    actividad: "Elaboración de té, café, mate e infusiones de hierbas",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "107902",
    actividad: "Elaboración de levaduras naturales o artificiales",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "107903",
    actividad:
      "Elaboración de vinagres, mostazas, mayonesas y condimentos en general",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "107909",
    actividad: "Elaboración de otros productos alimenticios n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "108000",
    actividad: "Elaboración de piensos preparados para animales",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "110110",
    actividad: "Elaboración de pisco (industrias pisqueras)",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "110120",
    actividad:
      "Destilación, rectificación y mezclas de bebidas alcohólicas; excepto pisco",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "110200",
    actividad: "Elaboración de vinos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "110300",
    actividad: "Elaboración de bebidas malteadas y de malta",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "110401",
    actividad: "Elaboración de bebidas no alcohólicas",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "110402",
    actividad: "Producción de aguas minerales y otras aguas embotelladas",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "120001",
    actividad: "Elaboración de cigarros y cigarrillos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "120009",
    actividad: "Elaboración de otros productos de tabaco n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "131100",
    actividad: "Preparación e hilatura de fibras textiles",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "131200",
    actividad: "Tejedura de productos textiles",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "131300",
    actividad: "Acabado de productos textiles",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "139100",
    actividad: "Fabricación de tejidos de punto y ganchillo",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "139200",
    actividad:
      "Fabricación de artículos confeccionados de materiales textiles, excepto prendas de vestir",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "139300",
    actividad: "Fabricación de tapices y alfombras",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "139400",
    actividad: "Fabricación de cuerdas, cordeles, bramantes y redes",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "139900",
    actividad: "Fabricación de otros productos textiles n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "141001",
    actividad:
      "Fabricación de prendas de vestir de materiales textiles y similares",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "141002",
    actividad: "Fabricación de prendas de vestir de cuero natural o artificial",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "141003",
    actividad: "Fabricación de accesorios de vestir",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "141004",
    actividad: "Fabricación de ropa de trabajo",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "142000",
    actividad: "Fabricación de artículos de piel",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "143000",
    actividad: "Fabricación de artículos de punto y ganchillo",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "151100",
    actividad: "Curtido y adobo de cueros; adobo y teñido de pieles",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "151200",
    actividad:
      "Fabricación de maletas, bolsos y artículos similares, artículos de talabartería y guarnicionería",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "152000",
    actividad: "Fabricación de calzado",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "161000",
    actividad: "Aserrado y acepilladura de madera",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "162100",
    actividad:
      "Fabricación de hojas de madera para enchapado y tableros a base de madera",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "162200",
    actividad:
      "Fabricación de partes y piezas de carpintería para edificios y construcciones",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "162300",
    actividad: "Fabricación de recipientes de madera",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "162900",
    actividad:
      "Fabricación de otros productos de madera, de artículos de corcho, paja y materiales trenzables",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "170110",
    actividad: "Fabricación de celulosa y otras pastas de madera",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "170190",
    actividad:
      "Fabricación de papel y cartón para su posterior uso industrial n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "170200",
    actividad:
      "Fabricación de papel y cartón ondulado y de envases de papel y cartón",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "170900",
    actividad: "Fabricación de otros artículos de papel y cartón",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "181101",
    actividad: "Impresión de libros",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "181109",
    actividad: "Otras actividades de impresión n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "181200",
    actividad: "Actividades de servicios relacionadas con la impresión",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "182000",
    actividad: "Reproducción de grabaciones",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "191000",
    actividad: "Fabricación de productos de hornos de coque",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "192000",
    actividad: "Fabricación de productos de la refinación del petróleo",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "201101",
    actividad:
      "Fabricación de carbón vegetal (excepto activado); fabricación de briquetas de carbón vegetal",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "201109",
    actividad: "Fabricación de otras sustancias químicas básicas n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "201200",
    actividad: "Fabricación de abonos y compuestos de nitrógeno",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "201300",
    actividad:
      "Fabricación de plásticos y caucho sintético en formas primarias",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "202100",
    actividad:
      "Fabricación de plaguicidas y otros productos químicos de uso agropecuario",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "202200",
    actividad:
      "Fabricación de pinturas, barnices y productos de revestimiento, tintas de imprenta y masillas",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "202300",
    actividad:
      "Fabricación de jabones y detergentes, preparados para limpiar, perfumes y preparados de tocador",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "202901",
    actividad: "Fabricación de explosivos y productos pirotécnicos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "202909",
    actividad: "Fabricación de otros productos químicos n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "203000",
    actividad: "Fabricación de fibras artificiales",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "210000",
    actividad:
      "Fabricación de productos farmacéuticos, sustancias químicas medicinales y productos botánicos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "221100",
    actividad:
      "Fabricación de cubiertas y cámaras de caucho; recauchutado y renovación de cubiertas de caucho",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "221900",
    actividad: "Fabricación de otros productos de caucho",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "222000",
    actividad: "Fabricación de productos de plástico",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "231001",
    actividad: "Fabricación de vidrio plano",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "231002",
    actividad: "Fabricación de vidrio hueco",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "231003",
    actividad: "Fabricación de fibras de vidrio",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "231009",
    actividad: "Fabricación de productos de vidrio n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "239100",
    actividad: "Fabricación de productos refractarios",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "239200",
    actividad: "Fabricación de materiales de construcción de arcilla",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "239300",
    actividad: "Fabricación de otros productos de porcelana y de cerámica",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "239400",
    actividad: "Fabricación de cemento, cal y yeso",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "239500",
    actividad: "Fabricación de artículos de hormigón, cemento y yeso",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "239600",
    actividad: "Corte, talla y acabado de la piedra",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "239900",
    actividad: "Fabricación de otros productos minerales no metálicos n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "241000",
    actividad: "Industrias básicas de hierro y acero",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "242001",
    actividad: "Fabricación de productos primarios de cobre",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "242002",
    actividad: "Fabricación de productos primarios de aluminio",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "242009",
    actividad:
      "Fabricación de productos primarios de metales preciosos y de otros metales no ferrosos n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "243100",
    actividad: "Fundición de hierro y acero",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "243200",
    actividad: "Fundición de metales no ferrosos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "251100",
    actividad: "Fabricación de productos metálicos para uso estructural",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "251201",
    actividad:
      "Fabricación de recipientes de metal para gases comprimidos o licuados",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "251209",
    actividad:
      "Fabricación de tanques, depósitos y recipientes de metal n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "251300",
    actividad:
      "Fabricación de generadores de vapor, excepto calderas de agua caliente para calefacción central",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "252000",
    actividad: "Fabricación de armas y municiones",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "259100",
    actividad:
      "Forja, prensado, estampado y laminado de metales; pulvimetalurgia",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "259200",
    actividad: "Tratamiento y revestimiento de metales; maquinado",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "259300",
    actividad:
      "Fabricación de artículos de cuchillería, herramientas de mano y artículos de ferretería",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "259900",
    actividad: "Fabricación de otros productos elaborados de metal n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "261000",
    actividad: "Fabricación de componentes y tableros electrónicos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "262000",
    actividad: "Fabricación de computadores y equipo periférico",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "263000",
    actividad: "Fabricación de equipo de comunicaciones",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "264000",
    actividad: "Fabricación de aparatos electrónicos de consumo",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "265100",
    actividad:
      "Fabricación de equipo de medición, prueba, navegación y control",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "265200",
    actividad: "Fabricación de relojes",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "266000",
    actividad:
      "Fabricación de equipo de irradiación y equipo electrónico de uso médico y terapéutico",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "267000",
    actividad: "Fabricación de instrumentos ópticos y equipo fotográfico",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "268000",
    actividad: "Fabricación de soportes magnéticos y ópticos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "271000",
    actividad:
      "Fabricación de motores, generadores y transformadores eléctricos, aparatos de distribución y control",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "272000",
    actividad: "Fabricación de pilas, baterías y acumuladores",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "273100",
    actividad: "Fabricación de cables de fibra óptica",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "273200",
    actividad: "Fabricación de otros hilos y cables eléctricos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "273300",
    actividad: "Fabricación de dispositivos de cableado",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "274000",
    actividad: "Fabricación de equipo eléctrico de iluminación",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "275000",
    actividad: "Fabricación de aparatos de uso doméstico",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "279000",
    actividad: "Fabricación de otros tipos de equipo eléctrico",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "281100",
    actividad:
      "Fabricación de motores y turbinas, excepto para aeronaves, vehículos automotores y motocicletas",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "281200",
    actividad: "Fabricación de equipo de propulsión de fluidos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "281300",
    actividad: "Fabricación de otras bombas, compresores, grifos y válvulas",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "281400",
    actividad:
      "Fabricación de cojinetes, engranajes, trenes de engranajes y piezas de transmisión",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "281500",
    actividad: "Fabricación de hornos, calderas y quemadores",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "281600",
    actividad: "Fabricación de equipo de elevación y manipulación",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "281700",
    actividad:
      "Fabricación de maquinaria y equipo de oficina (excepto computadores y equipo periférico)",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "281800",
    actividad: "Fabricación de herramientas de mano motorizadas",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "281900",
    actividad: "Fabricación de otros tipos de maquinaria de uso general",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "282100",
    actividad: "Fabricación de maquinaria agropecuaria y forestal",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "282200",
    actividad:
      "Fabricación de maquinaria para la conformación de metales y de máquinas herramienta",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "282300",
    actividad: "Fabricación de maquinaria metalúrgica",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "282400",
    actividad:
      "Fabricación de maquinaria para la explotación de minas y canteras y para obras de construcción",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "282500",
    actividad:
      "Fabricación de maquinaria para la elaboración de alimentos, bebidas y tabaco",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "282600",
    actividad:
      "Fabricación de maquinaria para la elaboración de productos textiles, prendas de vestir y cueros",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "282900",
    actividad: "Fabricación de otros tipos de maquinaria de uso especial",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "291000",
    actividad: "Fabricación de vehículos automotores",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "292000",
    actividad:
      "Fabricación de carrocerías para vehículos automotores; fabricación de remolques y semirremolques",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "293000",
    actividad:
      "Fabricación de partes, piezas y accesorios para vehículos automotores",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "301100",
    actividad:
      "Construcción de buques, embarcaciones menores y estructuras flotantes",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "301200",
    actividad: "Construcción de embarcaciones de recreo y de deporte",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "302000",
    actividad: "Fabricación de locomotoras y material rodante",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "303000",
    actividad: "Fabricación de aeronaves, naves espaciales y maquinaria conexa",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "304000",
    actividad: "Fabricación de vehículos militares de combate",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "309100",
    actividad: "Fabricación de motocicletas",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "309200",
    actividad: "Fabricación de bicicletas y de sillas de ruedas",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "309900",
    actividad: "Fabricación de otros tipos de equipo de transporte n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "310001",
    actividad: "Fabricación de muebles principalmente de madera",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "310009",
    actividad: "Fabricación de colchones; fabricación de otros muebles n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "321100",
    actividad: "Fabricación de joyas y artículos conexos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "321200",
    actividad: "Fabricación de bisutería y artículos conexos",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "322000",
    actividad: "Fabricación de instrumentos musicales",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "323000",
    actividad: "Fabricación de artículos de deporte",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "324000",
    actividad: "Fabricación de juegos y juguetes",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "325001",
    actividad: "Actividades de laboratorios dentales",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "325009",
    actividad:
      "Fabricación de instrumentos y materiales médicos, oftalmológicos y odontológicos n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "329000",
    actividad: "Otras industrias manufactureras n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331100",
    actividad: "Reparación de productos elaborados de metal",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331201",
    actividad: "Reparación de maquinaria agropecuaria y forestal",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331202",
    actividad:
      "Reparación de maquinaria metalúrgica, para la minería, extracción de petróleo y para la construcción",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331203",
    actividad:
      "Reparación de maquinaria para la elaboración de alimentos, bebidas y tabaco",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331204",
    actividad:
      "Reparación de maquinaria para producir textiles, prendas de vestir, artículos de cuero y calzado",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331209",
    actividad:
      "Reparación de otro tipo de maquinaria y equipos industriales n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331301",
    actividad: "Reparación de equipo de medición, prueba, navegación y control",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331309",
    actividad: "Reparación de otros equipos electrónicos y ópticos n.c.p.",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331400",
    actividad:
      "Reparación de equipo eléctrico (excepto reparación de equipo y enseres domésticos)",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331501",
    actividad:
      "Reparación de buques, embarcaciones menores y estructuras flotantes",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331502",
    actividad: "Reparación de aeronaves y naves espaciales",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331509",
    actividad:
      "Reparación de otros equipos de transporte n.c.p., excepto vehículos automotores",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "331900",
    actividad: "Reparación de otros tipos de equipo",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "332000",
    actividad: "Instalación de maquinaria y equipos industriales",
    rubro: "Industrias manufactureras",
  },
  {
    codigo: "351011",
    actividad: "Generación de energía eléctrica en centrales hidroeléctricas",
    rubro: "Suministro de electricidad, gas, vapor y aire acondicionado",
  },
  {
    codigo: "351012",
    actividad: "Generación de energía eléctrica en centrales termoeléctricas",
    rubro: "Suministro de electricidad, gas, vapor y aire acondicionado",
  },
  {
    codigo: "351019",
    actividad: "Generación de energía eléctrica en otras centrales n.c.p.",
    rubro: "Suministro de electricidad, gas, vapor y aire acondicionado",
  },
  {
    codigo: "351020",
    actividad: "Transmisión de energía eléctrica",
    rubro: "Suministro de electricidad, gas, vapor y aire acondicionado",
  },
  {
    codigo: "351030",
    actividad: "Distribución de energía eléctrica",
    rubro: "Suministro de electricidad, gas, vapor y aire acondicionado",
  },
  {
    codigo: "352010",
    actividad: "Regasificación de Gas Natural Licuado (GNL)",
    rubro: "Suministro de electricidad, gas, vapor y aire acondicionado",
  },
  {
    codigo: "352020",
    actividad:
      "Fabricación de gas; distribución de combustibles gaseosos por tubería, excepto regasificación de GNL",
    rubro: "Suministro de electricidad, gas, vapor y aire acondicionado",
  },
  {
    codigo: "353001",
    actividad: "Suministro de vapor y de aire acondicionado",
    rubro: "Suministro de electricidad, gas, vapor y aire acondicionado",
  },
  {
    codigo: "353002",
    actividad: "Elaboración de hielo (excepto fabricación de hielo seco)",
    rubro: "Suministro de electricidad, gas, vapor y aire acondicionado",
  },
  {
    codigo: "360000",
    actividad: "Captación, tratamiento y distribución de agua",
    rubro:
      "Suministro de agua; evacuación de aguas residuales, gestión de desechos y descontaminación",
  },
  {
    codigo: "370000",
    actividad: "Evacuación y tratamiento de aguas servidas",
    rubro:
      "Suministro de agua; evacuación de aguas residuales, gestión de desechos y descontaminación",
  },
  {
    codigo: "381100",
    actividad: "Recogida de desechos no peligrosos",
    rubro:
      "Suministro de agua; evacuación de aguas residuales, gestión de desechos y descontaminación",
  },
  {
    codigo: "381200",
    actividad: "Recogida de desechos peligrosos",
    rubro:
      "Suministro de agua; evacuación de aguas residuales, gestión de desechos y descontaminación",
  },
  {
    codigo: "382100",
    actividad: "Tratamiento y eliminación de desechos no peligrosos",
    rubro:
      "Suministro de agua; evacuación de aguas residuales, gestión de desechos y descontaminación",
  },
  {
    codigo: "382200",
    actividad: "Tratamiento y eliminación de desechos peligrosos",
    rubro:
      "Suministro de agua; evacuación de aguas residuales, gestión de desechos y descontaminación",
  },
  {
    codigo: "383001",
    actividad:
      "Recuperación y reciclamiento de desperdicios y desechos metálicos",
    rubro:
      "Suministro de agua; evacuación de aguas residuales, gestión de desechos y descontaminación",
  },
  {
    codigo: "383002",
    actividad: "Recuperación y reciclamiento de papel",
    rubro:
      "Suministro de agua; evacuación de aguas residuales, gestión de desechos y descontaminación",
  },
  {
    codigo: "383003",
    actividad: "Recuperación y reciclamiento de vidrio",
    rubro:
      "Suministro de agua; evacuación de aguas residuales, gestión de desechos y descontaminación",
  },
  {
    codigo: "383009",
    actividad:
      "Recuperación y reciclamiento de otros desperdicios y desechos n.c.p.",
    rubro:
      "Suministro de agua; evacuación de aguas residuales, gestión de desechos y descontaminación",
  },
  {
    codigo: "390000",
    actividad:
      "Actividades de descontaminación y otros servicios de gestión de desechos",
    rubro:
      "Suministro de agua; evacuación de aguas residuales, gestión de desechos y descontaminación",
  },
  {
    codigo: "410010",
    actividad: "Construcción de edificios para uso residencial",
    rubro: "Construcción",
  },
  {
    codigo: "410020",
    actividad: "Construcción de edificios para uso no residencial",
    rubro: "Construcción",
  },
  {
    codigo: "421000",
    actividad: "Construcción de carreteras y líneas de ferrocarril",
    rubro: "Construcción",
  },
  {
    codigo: "422000",
    actividad: "Construcción de proyectos de servicio público",
    rubro: "Construcción",
  },
  {
    codigo: "429000",
    actividad: "Construcción de otras obras de ingeniería civil",
    rubro: "Construcción",
  },
  { codigo: "431100", actividad: "Demolición", rubro: "Construcción" },
  {
    codigo: "431200",
    actividad: "Preparación del terreno",
    rubro: "Construcción",
  },
  {
    codigo: "432100",
    actividad: "Instalaciones eléctricas",
    rubro: "Construcción",
  },
  {
    codigo: "432200",
    actividad: "Instalaciones de gasfitería, calefacción y aire acondicionado",
    rubro: "Construcción",
  },
  {
    codigo: "432900",
    actividad: "Otras instalaciones para obras de construcción",
    rubro: "Construcción",
  },
  {
    codigo: "433000",
    actividad: "Terminación y acabado de edificios",
    rubro: "Construcción",
  },
  {
    codigo: "439000",
    actividad: "Otras actividades especializadas de construcción",
    rubro: "Construcción",
  },
  {
    codigo: "451001",
    actividad: "Venta al por mayor de vehículos automotores",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "451002",
    actividad:
      "Venta al por menor de vehículos automotores nuevos o usados (incluye compraventa)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "452001",
    actividad: "Servicio de lavado de vehículos automotores",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "452002",
    actividad: "Mantenimiento y reparación de vehículos automotores",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "453000",
    actividad:
      "Venta de partes, piezas y accesorios para vehículos automotores",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "454001",
    actividad: "Venta de motocicletas",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "454002",
    actividad: "Venta de partes, piezas y accesorios de motocicletas",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "454003",
    actividad: "Mantenimiento y reparación de motocicletas",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "461001",
    actividad: "Corretaje al por mayor de productos agrícolas",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "461002",
    actividad: "Corretaje al por mayor de ganado",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "461009",
    actividad: "Otros tipos de corretajes o remates al por mayor n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "462010",
    actividad: "Venta al por mayor de materias primas agrícolas",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "462020",
    actividad: "Venta al por mayor de animales vivos",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "462090",
    actividad:
      "Venta al por mayor de otras materias primas agropecuarias n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "463011",
    actividad: "Venta al por mayor de frutas y verduras",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "463012",
    actividad: "Venta al por mayor de carne y productos cárnicos",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "463013",
    actividad:
      "Venta al por mayor de productos del mar (pescados, mariscos y algas)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "463014",
    actividad: "Venta al por mayor de productos de confitería",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "463019",
    actividad:
      "Venta al por mayor de huevos, lácteos, abarrotes y de otros alimentos n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "463020",
    actividad: "Venta al por mayor de bebidas alcohólicas y no alcohólicas",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "463030",
    actividad: "Venta al por mayor de tabaco",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "464100",
    actividad:
      "Venta al por mayor de productos textiles, prendas de vestir y calzado",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "464901",
    actividad: "Venta al por mayor de muebles, excepto muebles de oficina",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "464902",
    actividad:
      "Venta al por mayor de artículos eléctricos y electrónicos para el hogar",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "464903",
    actividad:
      "Venta al por mayor de artículos de perfumería, de tocador y cosméticos",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "464904",
    actividad: "Venta al por mayor de artículos de papelería y escritorio",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "464905",
    actividad: "Venta al por mayor de libros",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "464906",
    actividad: "Venta al por mayor de diarios y revistas",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "464907",
    actividad: "Venta al por mayor de productos farmacéuticos y medicinales",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "464908",
    actividad: "Venta al por mayor de instrumentos científicos y quirúrgicos",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "464909",
    actividad: "Venta al por mayor de otros enseres domésticos n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "465100",
    actividad:
      "Venta al por mayor de computadores, equipo periférico y programas informáticos",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "465200",
    actividad:
      "Venta al por mayor de equipo, partes y piezas electrónicos y de telecomunicaciones",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "465300",
    actividad:
      "Venta al por mayor de maquinaria, equipo y materiales agropecuarios",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "465901",
    actividad:
      "Venta al por mayor de maquinaria metalúrgica, para la minería, extracción de petróleo y construcción",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "465902",
    actividad:
      "Venta al por mayor de maquinaria para la elaboración de alimentos, bebidas y tabaco",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "465903",
    actividad:
      "Venta al por mayor de maquinaria para la industria textil, del cuero y del calzado",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "465904",
    actividad:
      "Venta al por mayor de maquinaria y equipo de oficina; venta al por mayor de muebles de oficina",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "465905",
    actividad:
      "Venta al por mayor de equipo de transporte(excepto vehículos automotores, motocicletas y bicicletas)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "465909",
    actividad:
      "Venta al por mayor de otros tipos de maquinaria y equipo n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "466100",
    actividad:
      "Venta al por mayor de combustibles sólidos, líquidos y gaseosos y productos conexos",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "466200",
    actividad: "Venta al por mayor de metales y minerales metalíferos",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "466301",
    actividad:
      "Venta al por mayor de madera en bruto y productos primarios de la elaboración de madera",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "466302",
    actividad:
      "Venta al por mayor de materiales de construcción, artículos de ferretería, gasfitería y calefacción",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "466901",
    actividad: "Venta al por mayor de productos químicos",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "466902",
    actividad: "Venta al por mayor de desechos metálicos (chatarra)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "466909",
    actividad:
      "Venta al por mayor de desperdicios, desechos y otros productos n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "469000",
    actividad: "Venta al por mayor no especializada",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "471100",
    actividad:
      "Venta al por menor en comercios de alimentos, bebidas o tabaco (supermercados e hipermercados)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "471910",
    actividad:
      "Venta al por menor en comercios de vestuario y productos para el hogar (grandes tiendas)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "471990",
    actividad:
      "Otras actividades de venta al por menor en comercios no especializados n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "472101",
    actividad:
      "Venta al por menor de alimentos en comercios especializados (almacenes pequeños y minimarket)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "472102",
    actividad:
      "Venta al por menor en comercios especializados de carne y productos cárnicos",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "472103",
    actividad:
      "Venta al por menor en comercios especializados de frutas y verduras (verdulerías)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "472104",
    actividad:
      "Venta al por menor en comercios especializados de pescado, mariscos y productos conexos",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "472105",
    actividad:
      "Venta al por menor en comercios especializados de productos de panadería y pastelería",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "472109",
    actividad:
      "Venta al por menor en comercios especializados de huevos, confites y productos alimenticios n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "472200",
    actividad:
      "Venta al por menor de bebidas alcohólicas y no alcohólicas en comercios especializados (botillerías)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "472300",
    actividad:
      "Venta al por menor de tabaco y productos de tabaco en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "473000",
    actividad:
      "Venta al por menor de combustibles para vehículos automotores en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "474100",
    actividad:
      "Venta al por menor de computadores, equipo periférico, programas informáticos y equipo de telecom.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "474200",
    actividad:
      "Venta al por menor de equipo de sonido y de video en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "475100",
    actividad:
      "Venta al por menor de telas, lanas, hilos y similares en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "475201",
    actividad:
      "Venta al por menor de artículos de ferretería y materiales de construcción",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "475202",
    actividad:
      "Venta al por menor de pinturas, barnices y lacas en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "475203",
    actividad:
      "Venta al por menor de productos de vidrio en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "475300",
    actividad:
      "Venta al por menor de tapices, alfombras y cubrimientos para paredes y pisos",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "475901",
    actividad:
      "Venta al por menor de muebles y colchones en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "475902",
    actividad:
      "Venta al por menor de instrumentos musicales en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "475909",
    actividad:
      "Venta al por menor de aparatos eléctricos, textiles para el hogar y otros enseres domésticos n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "476101",
    actividad: "Venta al por menor de libros en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "476102",
    actividad:
      "Venta al por menor de diarios y revistas en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "476103",
    actividad:
      "Venta al por menor de artículos de papelería y escritorio en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "476200",
    actividad:
      "Venta al por menor de grabaciones de música y de video en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "476301",
    actividad:
      "Venta al por menor de artículos de caza y pesca en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "476302",
    actividad:
      "Venta al por menor de bicicletas y sus repuestos en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "476309",
    actividad:
      "Venta al por menor de otros artículos y equipos de deporte n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "476400",
    actividad:
      "Venta al por menor de juegos y juguetes en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477101",
    actividad: "Venta al por menor de calzado en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477102",
    actividad:
      "Venta al por menor de prendas y accesorios de vestir en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477103",
    actividad:
      "Venta al por menor de carteras, maletas y otros accesorios de viaje en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477201",
    actividad:
      "Venta al por menor de productos farmacéuticos y medicinales en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477202",
    actividad:
      "Venta al por menor de artículos ortopédicos en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477203",
    actividad:
      "Venta al por menor de artículos de perfumería, de tocador y cosméticos en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477310",
    actividad:
      "Venta al por menor de gas licuado en bombonas (cilindros) en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477391",
    actividad:
      "Venta al por menor de alimento y accesorios para mascotas en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477392",
    actividad:
      "Venta al por menor de armas y municiones en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477393",
    actividad:
      "Venta al por menor de artículos ópticos en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477394",
    actividad:
      "Venta al por menor de artículos de joyería, bisutería y relojería en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477395",
    actividad:
      "Venta al por menor de carbón, leña y otros combustibles de uso doméstico en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477396",
    actividad:
      "Venta al por menor de recuerdos, artesanías y artículos religiosos en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477397",
    actividad:
      "Venta al por menor de flores, plantas, arboles, semillas y abonos en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477398",
    actividad: "Venta al por menor de mascotas en comercios especializados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477399",
    actividad:
      "Venta al por menor de otros productos en comercios especializados n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477401",
    actividad: "Venta al por menor de antigüedades en comercios",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477402",
    actividad: "Venta al por menor de ropa usada en comercios",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "477409",
    actividad:
      "Venta al por menor de otros artículos de segunda mano en comercios n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "478100",
    actividad:
      "Venta al por menor de alimentos, bebidas y tabaco en puestos de venta y mercados (incluye ferias)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "478200",
    actividad:
      "Venta al por menor de productos textiles, prendas de vestir y calzado en puestos de venta y mercados",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "478900",
    actividad:
      "Venta al por menor de otros productos en puestos de venta y mercados (incluye ferias)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "479100",
    actividad: "Venta al por menor por correo, por Internet y vía telefónica",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "479901",
    actividad:
      "Venta al por menor realizada por independientes en la locomoción colectiva (Ley 20.388)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "479902",
    actividad: "Venta al por menor mediante máquinas expendedoras",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "479903",
    actividad:
      "Venta al por menor por comisionistas (no dependientes de comercios)",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "479909",
    actividad:
      "Otras actividades de venta por menor no realizadas en comercios, puestos de venta o mercados n.c.p.",
    rubro:
      "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas",
  },
  {
    codigo: "491100",
    actividad: "Transporte interurbano de pasajeros por ferrocarril",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "491200",
    actividad: "Transporte de carga por ferrocarril",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "492110",
    actividad:
      "Transporte urbano y suburbano de pasajeros vía metro y metrotren",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "492120",
    actividad:
      "Transporte urbano y suburbano de pasajeros vía locomoción colectiva",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "492130",
    actividad: "Transporte de pasajeros vía taxi colectivo",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "492190",
    actividad:
      "Otras actividades de transporte urbano y suburbano de pasajeros por vía terrestre n.c.p.",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "492210",
    actividad: "Servicios de transporte de escolares",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "492220",
    actividad: "Servicios de transporte de trabajadores",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "492230",
    actividad:
      "Servicios de transporte de pasajeros en taxis libres y radiotaxis",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "492240",
    actividad: "Servicios de transporte a turistas",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "492250",
    actividad: "Transporte de pasajeros en buses interurbanos",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "492290",
    actividad:
      "Otras actividades de transporte de pasajeros por vía terrestre n.c.p.",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "492300",
    actividad: "Transporte de carga por carretera",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "493010",
    actividad: "Transporte por oleoductos",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "493020",
    actividad: "Transporte por gasoductos",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "493090",
    actividad: "Otras actividades de transporte por tuberías n.c.p.",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "501100",
    actividad: "Transporte de pasajeros marítimo y de cabotaje",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "501200",
    actividad: "Transporte de carga marítimo y de cabotaje",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "502100",
    actividad: "Transporte de pasajeros por vías de navegación interiores",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "502200",
    actividad: "Transporte de carga por vías de navegación interiores",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "511000",
    actividad: "Transporte de pasajeros por vía aérea",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "512000",
    actividad: "Transporte de carga por vía aérea",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "521001",
    actividad: "Explotación de frigoríficos para almacenamiento y depósito",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "521009",
    actividad: "Otros servicios de almacenamiento y depósito n.c.p.",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "522110",
    actividad: "Explotación de terminales terrestres de pasajeros",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "522120",
    actividad:
      "Explotación de estacionamientos de vehículos automotores y parquímetros",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "522130",
    actividad: "Servicios prestados por concesionarios de carreteras",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "522190",
    actividad:
      "Actividades de servicios vinculadas al transporte terrestre n.c.p.",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "522200",
    actividad: "Actividades de servicios vinculadas al transporte acuático",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "522300",
    actividad: "Actividades de servicios vinculadas al transporte aéreo",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "522400",
    actividad: "Manipulación de la carga",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "522910",
    actividad: "Agencias de aduanas",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "522920",
    actividad: "Agencias de naves",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "522990",
    actividad: "Otras actividades de apoyo al transporte n.c.p.",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "531000",
    actividad: "Actividades postales",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "532000",
    actividad: "Actividades de mensajería",
    rubro: "Transporte y almacenamiento",
  },
  {
    codigo: "551001",
    actividad: "Actividades de hoteles",
    rubro: "Actividades de alojamiento y de servicio de comidas",
  },
  {
    codigo: "551002",
    actividad: "Actividades de moteles",
    rubro: "Actividades de alojamiento y de servicio de comidas",
  },
  {
    codigo: "551003",
    actividad: "Actividades de residenciales para turistas",
    rubro: "Actividades de alojamiento y de servicio de comidas",
  },
  {
    codigo: "551009",
    actividad: "Otras actividades de alojamiento para turistas n.c.p.",
    rubro: "Actividades de alojamiento y de servicio de comidas",
  },
  {
    codigo: "552000",
    actividad: "Actividades de camping y de parques para casas rodantes",
    rubro: "Actividades de alojamiento y de servicio de comidas",
  },
  {
    codigo: "559001",
    actividad: "Actividades de residenciales para estudiantes y trabajadores",
    rubro: "Actividades de alojamiento y de servicio de comidas",
  },
  {
    codigo: "559009",
    actividad: "Otras actividades de alojamiento n.c.p.",
    rubro: "Actividades de alojamiento y de servicio de comidas",
  },
  {
    codigo: "561000",
    actividad: "Actividades de restaurantes y de servicio móvil de comidas",
    rubro: "Actividades de alojamiento y de servicio de comidas",
  },
  {
    codigo: "562100",
    actividad: "Suministro de comidas por encargo (Servicios de banquetería)",
    rubro: "Actividades de alojamiento y de servicio de comidas",
  },
  {
    codigo: "562900",
    actividad:
      "Suministro industrial de comidas por encargo; concesión de servicios de alimentación",
    rubro: "Actividades de alojamiento y de servicio de comidas",
  },
  {
    codigo: "563001",
    actividad:
      "Actividades de discotecas y cabaret (night club), con predominio del servicio de bebidas",
    rubro: "Actividades de alojamiento y de servicio de comidas",
  },
  {
    codigo: "563009",
    actividad: "Otras actividades de servicio de bebidas n.c.p.",
    rubro: "Actividades de alojamiento y de servicio de comidas",
  },
  {
    codigo: "581100",
    actividad: "Edición de libros",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "581200",
    actividad: "Edición de directorios y listas de correo",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "581300",
    actividad: "Edición de diarios, revistas y otras publicaciones periódicas",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "581900",
    actividad: "Otras actividades de edición",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "582000",
    actividad: "Edición de programas informáticos",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "591100",
    actividad:
      "Actividades de producción de películas cinematográficas, videos y programas de televisión",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "591200",
    actividad:
      "Actividades de postproducción de películas cinematográficas, videos y programas de televisión",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "591300",
    actividad:
      "Actividades de distribución de películas cinematográficas, videos y programas de televisión",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "591400",
    actividad:
      "Actividades de exhibición de películas cinematográficas y cintas de video",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "592000",
    actividad: "Actividades de grabación de sonido y edición de música",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "601000",
    actividad: "Transmisiones de radio",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "602000",
    actividad: "Programación y transmisiones de televisión",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "611010",
    actividad: "Telefonía fija",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "611020",
    actividad: "Telefonía larga distancia",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "611030",
    actividad: "Televisión de pago por cable",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "611090",
    actividad: "Otros servicios de telecomunicaciones alámbricas n.c.p.",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "612010",
    actividad: "Telefonía móvil celular",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "612020",
    actividad: "Radiocomunicaciones móviles",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "612030",
    actividad: "Televisión de pago inalámbrica",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "612090",
    actividad: "Otros servicios de telecomunicaciones inalámbricas n.c.p.",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "613010",
    actividad: "Telefonía móvil satelital",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "613020",
    actividad: "Televisión de pago satelital",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "613090",
    actividad: "Otros servicios de telecomunicaciones por satélite n.c.p.",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "619010",
    actividad: "Centros de llamados y centros de acceso a Internet",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "619090",
    actividad: "Otras actividades de telecomunicaciones n.c.p.",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "620100",
    actividad: "Actividades de programación informática",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "620200",
    actividad:
      "Actividades de consultoría de informática y de gestión de instalaciones informáticas",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "620900",
    actividad:
      "Otras actividades de tecnología de la información y de servicios informáticos",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "631100",
    actividad: "Procesamiento de datos, hospedaje y actividades conexas",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "631200",
    actividad: "Portales web",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "639100",
    actividad: "Actividades de agencias de noticias",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "639900",
    actividad: "Otras actividades de servicios de información n.c.p.",
    rubro: "Información y comunicaciones",
  },
  {
    codigo: "641100",
    actividad: "Banca central",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "641910",
    actividad: "Actividades bancarias",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "641990",
    actividad: "Otros tipos de intermediación monetaria n.c.p.",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "642000",
    actividad: "Actividades de sociedades de cartera",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "643000",
    actividad:
      "Fondos y sociedades de inversión y entidades financieras similares",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "649100",
    actividad: "Leasing financiero",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "649201",
    actividad: "Financieras",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "649202",
    actividad: "Actividades de crédito prendario",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "649203",
    actividad: "Cajas de compensación",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "649209",
    actividad: "Otras actividades de concesión de crédito n.c.p.",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "649900",
    actividad:
      "Otras actividades de servicios financieros, excepto las de seguros y fondos de pensiones n.c.p.",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "651100",
    actividad: "Seguros de vida",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "651210",
    actividad: "Seguros generales, excepto actividades de Isapres",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "651220",
    actividad: "Actividades de Isapres",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "652000",
    actividad: "Reaseguros",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "653000",
    actividad: "Fondos de pensiones",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "661100",
    actividad: "Administración de mercados financieros",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "661201",
    actividad: "Actividades de securitizadoras",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "661202",
    actividad: "Corredores de bolsa",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "661203",
    actividad: "Agentes de valores",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "661204",
    actividad: "Actividades de casas de cambio y operadores de divisa",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "661209",
    actividad: "Otros servicios de corretaje de valores y commodities n.c.p.",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "661901",
    actividad: "Actividades de cámaras de compensación",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "661902",
    actividad: "Administración de tarjetas de crédito",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "661903",
    actividad:
      "Empresas de asesoría y consultoría en inversión financiera; sociedades de apoyo al giro",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "661904",
    actividad: "Actividades de clasificadoras de riesgo",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "661909",
    actividad:
      "Otras actividades auxiliares de las actividades de servicios financieros n.c.p.",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "662100",
    actividad:
      "Evaluación de riesgos y daños (incluye actividades de liquidadores de seguros)",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "662200",
    actividad: "Actividades de agentes y corredores de seguros",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "662900",
    actividad:
      "Otras actividades auxiliares de las actividades de seguros y fondos de pensiones",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "663010",
    actividad: "Administradoras de Fondos de Pensiones (AFP)",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "663091",
    actividad: "Administradoras de fondos de inversión",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "663092",
    actividad: "Administradoras de fondos mutuos",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "663093",
    actividad:
      "Administradoras de fices (fondos de inversión de capital extranjero)",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "663094",
    actividad: "Administradoras de fondos para la vivienda",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "663099",
    actividad: "Administradoras de fondos para otros fines n.c.p.",
    rubro: "Actividades financieras y de seguros",
  },
  {
    codigo: "681011",
    actividad:
      "Alquiler de bienes inmuebles amoblados o con equipos y maquinarias",
    rubro: "Actividades inmobiliarias",
  },
  {
    codigo: "681012",
    actividad: "Compra, venta y alquiler (excepto amoblados) de inmuebles",
    rubro: "Actividades inmobiliarias",
  },
  {
    codigo: "681020",
    actividad: "Servicios imputados de alquiler de viviendas",
    rubro: "Actividades inmobiliarias",
  },
  {
    codigo: "682000",
    actividad:
      "Actividades inmobiliarias realizadas a cambio de una retribución o por contrata",
    rubro: "Actividades inmobiliarias",
  },
  {
    codigo: "691001",
    actividad: "Servicios de asesoramiento y representación jurídica",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "691002",
    actividad: "Servicio notarial",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "691003",
    actividad: "Conservador de bienes raíces",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "691004",
    actividad: "Receptores judiciales",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "691009",
    actividad:
      "Servicios de arbitraje; síndicos de quiebra y peritos judiciales; otras actividades jurídicas n.c.p.",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "692000",
    actividad:
      "Actividades de contabilidad, teneduría de libros y auditoría; consultoría fiscal",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "701000",
    actividad: "Actividades de oficinas principales",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "702000",
    actividad: "Actividades de consultoría de gestión",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "711001",
    actividad:
      "Servicios de arquitectura (diseño de edificios, dibujo de planos de construcción, entre otros)",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "711002",
    actividad:
      "Empresas de servicios de ingeniería y actividades conexas de consultoría técnica",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "711003",
    actividad:
      "Servicios profesionales de ingeniería y actividades conexas de consultoría técnica",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "712001",
    actividad:
      "Actividades de plantas de revisión técnica para vehículos automotores",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "712009",
    actividad:
      "Otros servicios de ensayos y análisis técnicos (excepto actividades de plantas de revisión técnica)",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "721000",
    actividad:
      "Investigaciones y desarrollo experimental en el campo de las ciencias naturales y la ingeniería",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "722000",
    actividad:
      "Investigaciones y desarrollo experimental en el campo de las ciencias sociales y las humanidades",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "731001",
    actividad: "Servicios de publicidad prestados por empresas",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "731002",
    actividad: "Servicios de publicidad prestados por profesionales",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "732000",
    actividad: "Estudios de mercado y encuestas de opinión pública",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "741001",
    actividad: "Actividades de diseño de vestuario",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "741002",
    actividad: "Actividades de diseño y decoración de interiores",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "741009",
    actividad: "Otras actividades especializadas de diseño n.c.p.",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "742001",
    actividad: "Servicios de revelado, impresión y ampliación de fotografías",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "742002",
    actividad: "Servicios y actividades de fotografía",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "742003",
    actividad: "Servicios personales de fotografía",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "749001",
    actividad:
      "Asesoría y gestión en la compra o venta de pequeñas y medianas empresas",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "749002",
    actividad:
      "Servicios de traducción e interpretación prestados por empresas",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "749003",
    actividad: "Servicios personales de traducción e interpretación",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "749004",
    actividad:
      "Actividades de agencias y agentes de representación de actores, deportistas y otras figuras públicas",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "749009",
    actividad: "Otras actividades profesionales, científicas y técnicas n.c.p.",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "750001",
    actividad: "Actividades de clínicas veterinarias",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "750002",
    actividad:
      "Actividades de veterinarios, técnicos y otro personal auxiliar, prestados de forma independiente",
    rubro: "Actividades profesionales, científicas y técnicas",
  },
  {
    codigo: "771000",
    actividad: "Alquiler de vehículos automotores sin chofer",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "772100",
    actividad: "Alquiler y arrendamiento de equipo recreativo y deportivo",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "772200",
    actividad: "Alquiler de cintas de video y discos",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "772900",
    actividad:
      "Alquiler de otros efectos personales y enseres domésticos (incluye mobiliario para eventos)",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "773001",
    actividad:
      "Alquiler de equipos de transporte sin operario, excepto vehículos automotores",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "773002",
    actividad:
      "Alquiler de maquinaria y equipo agropecuario, forestal, de construcción e ing. civil, sin operarios",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "773003",
    actividad:
      "Alquiler de maquinaria y equipo de oficina, sin operarios (sin servicio administrativo)",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "773009",
    actividad:
      "Alquiler de otros tipos de maquinarias y equipos sin operario n.c.p.",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "774000",
    actividad:
      "Arrendamiento de propiedad intelectual y similares, excepto obras protegidas por derechos de autor",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "781000",
    actividad: "Actividades de agencias de empleo",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "782000",
    actividad:
      "Actividades de agencias de empleo temporal (incluye empresas de servicios transitorios)",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "783000",
    actividad: "Otras actividades de dotación de recursos humanos",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "791100",
    actividad: "Actividades de agencias de viajes",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "791200",
    actividad: "Actividades de operadores turísticos",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "799000",
    actividad:
      "Otros servicios de reservas y actividades conexas (incluye venta de entradas para teatro, y otros)",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "801001",
    actividad: "Servicios de seguridad privada prestados por empresas",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "801002",
    actividad: "Servicio de transporte de valores en vehículos blindados",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "801003",
    actividad: "Servicios de seguridad privada prestados por independientes",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "802000",
    actividad:
      "Actividades de servicios de sistemas de seguridad (incluye servicios de cerrajería)",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "803000",
    actividad:
      "Actividades de investigación (incluye actividades de investigadores y detectives privados)",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "811000",
    actividad: "Actividades combinadas de apoyo a instalaciones",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "812100",
    actividad: "Limpieza general de edificios",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "812901",
    actividad:
      "Desratización, desinfección y exterminio de plagas no agrícolas",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "812909",
    actividad:
      "Otras actividades de limpieza de edificios e instalaciones industriales n.c.p.",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "813000",
    actividad:
      "Actividades de paisajismo, servicios de jardinería y servicios conexos",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "821100",
    actividad: "Actividades combinadas de servicios administrativos de oficina",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "821900",
    actividad:
      "Fotocopiado, preparación de documentos y otras actividades especializadas de apoyo de oficina",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "822000",
    actividad: "Actividades de call-center",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "823000",
    actividad: "Organización de convenciones y exposiciones comerciales",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "829110",
    actividad: "Actividades de agencias de cobro",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "829120",
    actividad: "Actividades de agencias de calificación crediticia",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "829200",
    actividad: "Actividades de envasado y empaquetado",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "829900",
    actividad: "Otras actividades de servicios de apoyo a las empresas n.c.p.",
    rubro: "Actividades de servicios administrativos y de apoyo",
  },
  {
    codigo: "841100",
    actividad: "Actividades de la administración pública en general",
    rubro:
      "Administración pública y defensa; planes de seguridad social de afiliación obligatoria",
  },
  {
    codigo: "841200",
    actividad:
      "Regulación de las actividades de organismos que prestan servicios sanitarios, educativos, culturales",
    rubro:
      "Administración pública y defensa; planes de seguridad social de afiliación obligatoria",
  },
  {
    codigo: "841300",
    actividad: "Regulación y facilitación de la actividad económica",
    rubro:
      "Administración pública y defensa; planes de seguridad social de afiliación obligatoria",
  },
  {
    codigo: "842100",
    actividad: "Relaciones exteriores",
    rubro:
      "Administración pública y defensa; planes de seguridad social de afiliación obligatoria",
  },
  {
    codigo: "842200",
    actividad: "Actividades de defensa",
    rubro:
      "Administración pública y defensa; planes de seguridad social de afiliación obligatoria",
  },
  {
    codigo: "842300",
    actividad: "Actividades de mantenimiento del orden público y de seguridad",
    rubro:
      "Administración pública y defensa; planes de seguridad social de afiliación obligatoria",
  },
  {
    codigo: "843010",
    actividad: "Fondo Nacional de Salud (FONASA)",
    rubro:
      "Administración pública y defensa; planes de seguridad social de afiliación obligatoria",
  },
  {
    codigo: "843020",
    actividad: "Instituto de Previsión Social (IPS)",
    rubro:
      "Administración pública y defensa; planes de seguridad social de afiliación obligatoria",
  },
  {
    codigo: "843090",
    actividad:
      "Otros planes de seguridad social de afiliación obligatoria n.c.p.",
    rubro:
      "Administración pública y defensa; planes de seguridad social de afiliación obligatoria",
  },
  {
    codigo: "850011",
    actividad: "Enseñanza preescolar pública",
    rubro: "Enseñanza",
  },
  {
    codigo: "850012",
    actividad:
      "Enseñanza primaria, secundaria científico humanista y técnico profesional pública",
    rubro: "Enseñanza",
  },
  {
    codigo: "850021",
    actividad: "Enseñanza preescolar privada",
    rubro: "Enseñanza",
  },
  {
    codigo: "850022",
    actividad:
      "Enseñanza primaria, secundaria científico humanista y técnico profesional privada",
    rubro: "Enseñanza",
  },
  {
    codigo: "853110",
    actividad: "Enseñanza superior en universidades públicas",
    rubro: "Enseñanza",
  },
  {
    codigo: "853120",
    actividad: "Enseñanza superior en universidades privadas",
    rubro: "Enseñanza",
  },
  {
    codigo: "853201",
    actividad: "Enseñanza superior en institutos profesionales",
    rubro: "Enseñanza",
  },
  {
    codigo: "853202",
    actividad: "Enseñanza superior en centros de formación técnica",
    rubro: "Enseñanza",
  },
  {
    codigo: "854100",
    actividad: "Enseñanza deportiva y recreativa",
    rubro: "Enseñanza",
  },
  { codigo: "854200", actividad: "Enseñanza cultural", rubro: "Enseñanza" },
  {
    codigo: "854901",
    actividad: "Enseñanza preuniversitaria",
    rubro: "Enseñanza",
  },
  {
    codigo: "854902",
    actividad: "Servicios personales de educación",
    rubro: "Enseñanza",
  },
  {
    codigo: "854909",
    actividad: "Otros tipos de enseñanza n.c.p.",
    rubro: "Enseñanza",
  },
  {
    codigo: "855000",
    actividad: "Actividades de apoyo a la enseñanza",
    rubro: "Enseñanza",
  },
  {
    codigo: "861010",
    actividad: "Actividades de hospitales y clínicas públicas",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "861020",
    actividad: "Actividades de hospitales y clínicas privadas",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "862010",
    actividad:
      "Actividades de centros de salud municipalizados (servicios de salud pública)",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "862021",
    actividad:
      "Centros médicos privados (establecimientos de atención ambulatoria)",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "862022",
    actividad:
      "Centros de atención odontológica privados (establecimientos de atención ambulatoria)",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "862031",
    actividad: "Servicios de médicos prestados de forma independiente",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "862032",
    actividad: "Servicios de odontólogos prestados de forma independiente",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "869010",
    actividad: "Actividades de laboratorios clínicos y bancos de sangre",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "869091",
    actividad:
      "Otros servicios de atención de la salud humana prestados por empresas",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "869092",
    actividad:
      "Servicios prestados de forma independiente por otros profesionales de la salud",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "871000",
    actividad: "Actividades de atención de enfermería en instituciones",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "872000",
    actividad:
      "Actividades de atención en instituciones para personas con discapacidad mental y toxicómanos",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "873000",
    actividad:
      "Actividades de atención en instituciones para personas de edad y personas con discapacidad física",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "879000",
    actividad: "Otras actividades de atención en instituciones",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "881000",
    actividad:
      "Actividades de asistencia social sin alojamiento para personas de edad y personas con discapacidad",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "889000",
    actividad: "Otras actividades de asistencia social sin alojamiento",
    rubro: "Actividades de atención de la salud humana y de asistencia social",
  },
  {
    codigo: "900001",
    actividad:
      "Servicios de producción de obras de teatro, conciertos, espectáculos de danza, otras prod. escénicas",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "900002",
    actividad:
      "Actividades artísticas realizadas por bandas de música, compañías de teatro, circenses y similares",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "900003",
    actividad:
      "Actividades de artistas realizadas de forma independiente: actores, músicos, escritores, entre otros",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "900004",
    actividad: "Servicios prestados por periodistas independientes",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "900009",
    actividad:
      "Otras actividades creativas, artísticas y de entretenimiento n.c.p.",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "910100",
    actividad: "Actividades de bibliotecas y archivos",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "910200",
    actividad:
      "Actividades de museos, gestión de lugares y edificios históricos",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "910300",
    actividad:
      "Actividades de jardines botánicos, zoológicos y reservas naturales",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "920010",
    actividad: "Actividades de casinos de juegos",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "920090",
    actividad: "Otras actividades de juegos de azar y apuestas n.c.p.",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "931101",
    actividad: "Hipódromos",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "931102",
    actividad:
      "Gestión de salas de billar; gestión de salas de bolos (bowling)",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "931109",
    actividad: "Gestión de otras instalaciones deportivas n.c.p.",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "931201",
    actividad: "Actividades de clubes de fútbol amateur y profesional",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "931209",
    actividad: "Actividades de otros clubes deportivos n.c.p.",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "931901",
    actividad: "Promoción y organización de competencias deportivas",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "931909",
    actividad: "Otras actividades deportivas n.c.p.",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "932100",
    actividad: "Actividades de parques de atracciones y parques temáticos",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "932901",
    actividad:
      "Gestión de salas de pool; gestión (explotación) de juegos electrónicos",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "932909",
    actividad: "Otras actividades de esparcimiento y recreativas n.c.p.",
    rubro: "Actividades artísticas, de entretenimiento y recreativas",
  },
  {
    codigo: "941100",
    actividad: "Actividades de asociaciones empresariales y de empleadores",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "941200",
    actividad: "Actividades de asociaciones profesionales",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "942000",
    actividad: "Actividades de sindicatos",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "949100",
    actividad: "Actividades de organizaciones religiosas",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "949200",
    actividad: "Actividades de organizaciones políticas",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "949901",
    actividad: "Actividades de centros de madres",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "949902",
    actividad: "Actividades de clubes sociales",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "949903",
    actividad:
      "Fundaciones y corporaciones; asociaciones que promueven actividades culturales o recreativas",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "949904",
    actividad: "Consejo de administración de edificios y condominios",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "949909",
    actividad: "Actividades de otras asociaciones n.c.p.",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "951100",
    actividad: "Reparación de computadores y equipo periférico",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "951200",
    actividad:
      "Reparación de equipo de comunicaciones (incluye la reparación teléfonos celulares)",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "952100",
    actividad:
      "Reparación de aparatos electrónicos de consumo (incluye aparatos de televisión y radio)",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "952200",
    actividad:
      "Reparación de aparatos de uso doméstico, equipo doméstico y de jardinería",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "952300",
    actividad: "Reparación de calzado y de artículos de cuero",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "952400",
    actividad: "Reparación de muebles y accesorios domésticos",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "952900",
    actividad: "Reparación de otros efectos personales y enseres domésticos",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "960100",
    actividad:
      "Lavado y limpieza, incluida la limpieza en seco, de productos textiles y de piel",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "960200",
    actividad: "Peluquería y otros tratamientos de belleza",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "960310",
    actividad: "Servicios funerarios",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "960320",
    actividad: "Servicios de cementerios",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "960901",
    actividad:
      "Servicios de adiestramiento, guardería, peluquería, paseo de mascotas (excepto act. veterinarias)",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "960902",
    actividad:
      "Actividades de salones de masajes, baños turcos, saunas, servicio de baños públicos",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "960909",
    actividad: "Otras actividades de servicios personales n.c.p.",
    rubro: "Otras actividades de servicios",
  },
  {
    codigo: "970000",
    actividad:
      "Actividades de los hogares como empleadores de personal doméstico",
    rubro:
      "Actividades de los hogares como empleadores; actividades no diferenciadas de los hogares ",
  },
  {
    codigo: "990000",
    actividad: "Actividades de organizaciones y órganos extraterritoriales",
    rubro: "Actividades de organizaciones y órganos extraterritoriales",
  },
  {
    codigo: "999999",
    actividad: "Otros.",
    rubro: "Otros.",
  },
];

export const COMMUNE_PROVINCE_REGION = [
  { comuna: "Iquique", provincia: "Iquique", region: "Tarapacá" },
  { comuna: "Alto Hospicio", provincia: "Iquique", region: "Tarapacá" },
  { comuna: "Pozo Almonte", provincia: "Tamarugal", region: "Tarapacá" },
  { comuna: "Camiña", provincia: "Tamarugal", region: "Tarapacá" },
  { comuna: "Colchane", provincia: "Tamarugal", region: "Tarapacá" },
  { comuna: "Huara", provincia: "Tamarugal", region: "Tarapacá" },
  { comuna: "Pica", provincia: "Tamarugal", region: "Tarapacá" },
  { comuna: "Antofagasta", provincia: "Antofagasta", region: "Antofagasta" },
  { comuna: "Mejillones", provincia: "Antofagasta", region: "Antofagasta" },
  { comuna: "Sierra Gorda", provincia: "Antofagasta", region: "Antofagasta" },
  { comuna: "Taltal", provincia: "Antofagasta", region: "Antofagasta" },
  { comuna: "Calama", provincia: "El Loa", region: "Antofagasta" },
  { comuna: "Ollagüe", provincia: "El Loa", region: "Antofagasta" },
  {
    comuna: "San Pedro de Atacama",
    provincia: "El Loa",
    region: "Antofagasta",
  },
  { comuna: "Tocopilla", provincia: "Tocopilla", region: "Antofagasta" },
  { comuna: "María Elena", provincia: "Tocopilla", region: "Antofagasta" },
  { comuna: "Copiapó", provincia: "Copiapó", region: "Atacama" },
  { comuna: "Caldera", provincia: "Copiapó", region: "Atacama" },
  { comuna: "Tierra Amarilla", provincia: "Copiapó", region: "Atacama" },
  { comuna: "Chañaral", provincia: "Chañaral", region: "Atacama" },
  { comuna: "Diego de Almagro", provincia: "Chañaral", region: "Atacama" },
  { comuna: "Vallenar", provincia: "Huasco", region: "Atacama" },
  { comuna: "Alto del Carmen", provincia: "Huasco", region: "Atacama" },
  { comuna: "Freirina", provincia: "Huasco", region: "Atacama" },
  { comuna: "Huasco", provincia: "Huasco", region: "Atacama" },
  { comuna: "La Serena", provincia: "Elqui", region: "Coquimbo" },
  { comuna: "Coquimbo", provincia: "Elqui", region: "Coquimbo" },
  { comuna: "Andacollo", provincia: "Elqui", region: "Coquimbo" },
  { comuna: "La Higuera", provincia: "Elqui", region: "Coquimbo" },
  { comuna: "Paiguano", provincia: "Elqui", region: "Coquimbo" },
  { comuna: "Vicuña", provincia: "Elqui", region: "Coquimbo" },
  { comuna: "Illapel", provincia: "Choapa", region: "Coquimbo" },
  { comuna: "Canela", provincia: "Choapa", region: "Coquimbo" },
  { comuna: "Los Vilos", provincia: "Choapa", region: "Coquimbo" },
  { comuna: "Salamanca", provincia: "Choapa", region: "Coquimbo" },
  { comuna: "Ovalle", provincia: "Limarí", region: "Coquimbo" },
  { comuna: "Combarbalá", provincia: "Limarí", region: "Coquimbo" },
  { comuna: "Monte Patria", provincia: "Limarí", region: "Coquimbo" },
  { comuna: "Punitaqui", provincia: "Limarí", region: "Coquimbo" },
  { comuna: "Río Hurtado", provincia: "Limarí", region: "Coquimbo" },
  { comuna: "Valparaíso", provincia: "Valparaíso", region: "Valparaíso" },
  { comuna: "Casablanca", provincia: "Valparaíso", region: "Valparaíso" },
  { comuna: "Concón", provincia: "Valparaíso", region: "Valparaíso" },
  { comuna: "Juan Fernández", provincia: "Valparaíso", region: "Valparaíso" },
  { comuna: "Puchuncaví", provincia: "Valparaíso", region: "Valparaíso" },
  { comuna: "Quintero", provincia: "Valparaíso", region: "Valparaíso" },
  { comuna: "Viña del Mar", provincia: "Valparaíso", region: "Valparaíso" },
  {
    comuna: "Isla de Pascua",
    provincia: "Isla de Pascua",
    region: "Valparaíso",
  },
  { comuna: "Los Andes", provincia: "Los Andes", region: "Valparaíso" },
  { comuna: "Calle Larga", provincia: "Los Andes", region: "Valparaíso" },
  { comuna: "Rinconada", provincia: "Los Andes", region: "Valparaíso" },
  { comuna: "San Esteban", provincia: "Los Andes", region: "Valparaíso" },
  { comuna: "La Ligua", provincia: "Petorca", region: "Valparaíso" },
  { comuna: "Cabildo", provincia: "Petorca", region: "Valparaíso" },
  { comuna: "Papudo", provincia: "Petorca", region: "Valparaíso" },
  { comuna: "Petorca", provincia: "Petorca", region: "Valparaíso" },
  { comuna: "Zapallar", provincia: "Petorca", region: "Valparaíso" },
  { comuna: "Quillota", provincia: "Quillota", region: "Valparaíso" },
  { comuna: "Calera", provincia: "Quillota", region: "Valparaíso" },
  { comuna: "Hijuelas", provincia: "Quillota", region: "Valparaíso" },
  { comuna: "La Cruz", provincia: "Quillota", region: "Valparaíso" },
  { comuna: "Nogales", provincia: "Quillota", region: "Valparaíso" },
  { comuna: "San Antonio", provincia: "San Antonio", region: "Valparaíso" },
  { comuna: "Algarrobo", provincia: "San Antonio", region: "Valparaíso" },
  { comuna: "Cartagena", provincia: "San Antonio", region: "Valparaíso" },
  { comuna: "El Quisco", provincia: "San Antonio", region: "Valparaíso" },
  { comuna: "El Tabo", provincia: "San Antonio", region: "Valparaíso" },
  { comuna: "Santo Domingo", provincia: "San Antonio", region: "Valparaíso" },
  {
    comuna: "San Felipe",
    provincia: "San Felipe de Aconcagua",
    region: "Valparaíso",
  },
  {
    comuna: "Catemu",
    provincia: "San Felipe de Aconcagua",
    region: "Valparaíso",
  },
  {
    comuna: "Llaillay",
    provincia: "San Felipe de Aconcagua",
    region: "Valparaíso",
  },
  {
    comuna: "Panquehue",
    provincia: "San Felipe de Aconcagua",
    region: "Valparaíso",
  },
  {
    comuna: "Putaendo",
    provincia: "San Felipe de Aconcagua",
    region: "Valparaíso",
  },
  {
    comuna: "Santa María",
    provincia: "San Felipe de Aconcagua",
    region: "Valparaíso",
  },
  { comuna: "Quilpué", provincia: "Marga Marga", region: "Valparaíso" },
  { comuna: "Limache", provincia: "Marga Marga", region: "Valparaíso" },
  { comuna: "Olmué", provincia: "Marga Marga", region: "Valparaíso" },
  { comuna: "Villa Alemana", provincia: "Marga Marga", region: "Valparaíso" },
  {
    comuna: "Rancagua",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Codegua",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Coinco",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Coltauco",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Doñihue",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Graneros",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Las Cabras",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Machalí",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Malloa",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Mostazal",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Olivar",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Peumo",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Pichidegua",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Quinta de Tilcoco",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Rengo",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Requínoa",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "San Vicente",
    provincia: "Cachapoal",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Pichilemu",
    provincia: "Cardenal Caro",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "La Estrella",
    provincia: "Cardenal Caro",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Litueche",
    provincia: "Cardenal Caro",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Marchihue",
    provincia: "Cardenal Caro",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Navidad",
    provincia: "Cardenal Caro",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Paredones",
    provincia: "Cardenal Caro",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "San Fernando",
    provincia: "Colchagua",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Chépica",
    provincia: "Colchagua",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Chimbarongo",
    provincia: "Colchagua",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Lolol",
    provincia: "Colchagua",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Nancagua",
    provincia: "Colchagua",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Palmilla",
    provincia: "Colchagua",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Peralillo",
    provincia: "Colchagua",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Placilla",
    provincia: "Colchagua",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Pumanque",
    provincia: "Colchagua",
    region: "Libertador General Bernardo O'Higgins",
  },
  {
    comuna: "Santa Cruz",
    provincia: "Colchagua",
    region: "Libertador General Bernardo O'Higgins",
  },
  { comuna: "Talca", provincia: "Talca", region: "Maule" },
  { comuna: "Constitución", provincia: "Talca", region: "Maule" },
  { comuna: "Curepto", provincia: "Talca", region: "Maule" },
  { comuna: "Empedrado", provincia: "Talca", region: "Maule" },
  { comuna: "Maule", provincia: "Talca", region: "Maule" },
  { comuna: "Pelarco", provincia: "Talca", region: "Maule" },
  { comuna: "Pencahue", provincia: "Talca", region: "Maule" },
  { comuna: "Río Claro", provincia: "Talca", region: "Maule" },
  { comuna: "San Clemente", provincia: "Talca", region: "Maule" },
  { comuna: "San Rafael", provincia: "Talca", region: "Maule" },
  { comuna: "Cauquenes", provincia: "Cauquenes", region: "Maule" },
  { comuna: "Chanco", provincia: "Cauquenes", region: "Maule" },
  { comuna: "Pelluhue", provincia: "Cauquenes", region: "Maule" },
  { comuna: "Curicó", provincia: "Curicó", region: "Maule" },
  { comuna: "Hualañé", provincia: "Curicó", region: "Maule" },
  { comuna: "Licantén", provincia: "Curicó", region: "Maule" },
  { comuna: "Molina", provincia: "Curicó", region: "Maule" },
  { comuna: "Rauco", provincia: "Curicó", region: "Maule" },
  { comuna: "Romeral", provincia: "Curicó", region: "Maule" },
  { comuna: "Sagrada Familia", provincia: "Curicó", region: "Maule" },
  { comuna: "Teno", provincia: "Curicó", region: "Maule" },
  { comuna: "Vichuquén", provincia: "Curicó", region: "Maule" },
  { comuna: "Linares", provincia: "Linares", region: "Maule" },
  { comuna: "Colbún", provincia: "Linares", region: "Maule" },
  { comuna: "Longaví", provincia: "Linares", region: "Maule" },
  { comuna: "Parral", provincia: "Linares", region: "Maule" },
  { comuna: "Retiro", provincia: "Linares", region: "Maule" },
  { comuna: "San Javier", provincia: "Linares", region: "Maule" },
  { comuna: "Villa Alegre", provincia: "Linares", region: "Maule" },
  { comuna: "Yerbas Buenas", provincia: "Linares", region: "Maule" },
  { comuna: "Concepción", provincia: "Concepción", region: "Biobío" },
  { comuna: "Coronel", provincia: "Concepción", region: "Biobío" },
  { comuna: "Chiguayante", provincia: "Concepción", region: "Biobío" },
  { comuna: "Florida", provincia: "Concepción", region: "Biobío" },
  { comuna: "Hualqui", provincia: "Concepción", region: "Biobío" },
  { comuna: "Lota", provincia: "Concepción", region: "Biobío" },
  { comuna: "Penco", provincia: "Concepción", region: "Biobío" },
  { comuna: "San Pedro de la Paz", provincia: "Concepción", region: "Biobío" },
  { comuna: "Santa Juana", provincia: "Concepción", region: "Biobío" },
  { comuna: "Talcahuano", provincia: "Concepción", region: "Biobío" },
  { comuna: "Tomé", provincia: "Concepción", region: "Biobío" },
  { comuna: "Hualpén", provincia: "Concepción", region: "Biobío" },
  { comuna: "Lebu", provincia: "Arauco", region: "Biobío" },
  { comuna: "Arauco", provincia: "Arauco", region: "Biobío" },
  { comuna: "Cañete", provincia: "Arauco", region: "Biobío" },
  { comuna: "Contulmo", provincia: "Arauco", region: "Biobío" },
  { comuna: "Curanilahue", provincia: "Arauco", region: "Biobío" },
  { comuna: "Los Alamos", provincia: "Arauco", region: "Biobío" },
  { comuna: "Tirúa", provincia: "Arauco", region: "Biobío" },
  { comuna: "Los Angeles", provincia: "Biobío", region: "Biobío" },
  { comuna: "Antuco", provincia: "Biobío", region: "Biobío" },
  { comuna: "Cabrero", provincia: "Biobío", region: "Biobío" },
  { comuna: "Laja", provincia: "Biobío", region: "Biobío" },
  { comuna: "Mulchén", provincia: "Biobío", region: "Biobío" },
  { comuna: "Nacimiento", provincia: "Biobío", region: "Biobío" },
  { comuna: "Negrete", provincia: "Biobío", region: "Biobío" },
  { comuna: "Quilaco", provincia: "Biobío", region: "Biobío" },
  { comuna: "Quilleco", provincia: "Biobío", region: "Biobío" },
  { comuna: "San Rosendo", provincia: "Biobío", region: "Biobío" },
  { comuna: "Santa Bárbara", provincia: "Biobío", region: "Biobío" },
  { comuna: "Tucapel", provincia: "Biobío", region: "Biobío" },
  { comuna: "Yumbel", provincia: "Biobío", region: "Biobío" },
  { comuna: "Alto Biobío", provincia: "Biobío", region: "Biobío" },
  { comuna: "Temuco", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Carahue", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Cunco", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Curarrehue", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Freire", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Galvarino", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Gorbea", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Lautaro", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Loncoche", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Melipeuco", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Nueva Imperial", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Padre Las Casas", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Perquenco", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Pitrufquén", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Pucón", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Saavedra", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Teodoro Schmidt", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Toltén", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Vilcún", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Villarrica", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Cholchol", provincia: "Cautín", region: "La Araucanía" },
  { comuna: "Angol", provincia: "Malleco", region: "La Araucanía" },
  { comuna: "Collipulli", provincia: "Malleco", region: "La Araucanía" },
  { comuna: "Curacautín", provincia: "Malleco", region: "La Araucanía" },
  { comuna: "Ercilla", provincia: "Malleco", region: "La Araucanía" },
  { comuna: "Lonquimay", provincia: "Malleco", region: "La Araucanía" },
  { comuna: "Los Sauces", provincia: "Malleco", region: "La Araucanía" },
  { comuna: "Lumaco", provincia: "Malleco", region: "La Araucanía" },
  { comuna: "Purén", provincia: "Malleco", region: "La Araucanía" },
  { comuna: "Renaico", provincia: "Malleco", region: "La Araucanía" },
  { comuna: "Traiguén", provincia: "Malleco", region: "La Araucanía" },
  { comuna: "Victoria", provincia: "Malleco", region: "La Araucanía" },
  { comuna: "Puerto Montt", provincia: "Llanquihue", region: "Los Lagos" },
  { comuna: "Calbuco", provincia: "Llanquihue", region: "Los Lagos" },
  { comuna: "Cochamó", provincia: "Llanquihue", region: "Los Lagos" },
  { comuna: "Fresia", provincia: "Llanquihue", region: "Los Lagos" },
  { comuna: "Frutillar", provincia: "Llanquihue", region: "Los Lagos" },
  { comuna: "Los Muermos", provincia: "Llanquihue", region: "Los Lagos" },
  { comuna: "Llanquihue", provincia: "Llanquihue", region: "Los Lagos" },
  { comuna: "Maullín", provincia: "Llanquihue", region: "Los Lagos" },
  { comuna: "Puerto Varas", provincia: "Llanquihue", region: "Los Lagos" },
  { comuna: "Castro", provincia: "Chiloé", region: "Los Lagos" },
  { comuna: "Ancud", provincia: "Chiloé", region: "Los Lagos" },
  { comuna: "Chonchi", provincia: "Chiloé", region: "Los Lagos" },
  { comuna: "Curaco de Vélez", provincia: "Chiloé", region: "Los Lagos" },
  { comuna: "Dalcahue", provincia: "Chiloé", region: "Los Lagos" },
  { comuna: "Puqueldón", provincia: "Chiloé", region: "Los Lagos" },
  { comuna: "Queilén", provincia: "Chiloé", region: "Los Lagos" },
  { comuna: "Quellón", provincia: "Chiloé", region: "Los Lagos" },
  { comuna: "Quemchi", provincia: "Chiloé", region: "Los Lagos" },
  { comuna: "Quinchao", provincia: "Chiloé", region: "Los Lagos" },
  { comuna: "Osorno", provincia: "Osorno", region: "Los Lagos" },
  { comuna: "Puerto Octay", provincia: "Osorno", region: "Los Lagos" },
  { comuna: "Purranque", provincia: "Osorno", region: "Los Lagos" },
  { comuna: "Puyehue", provincia: "Osorno", region: "Los Lagos" },
  { comuna: "Río Negro", provincia: "Osorno", region: "Los Lagos" },
  { comuna: "San Juan de la Costa", provincia: "Osorno", region: "Los Lagos" },
  { comuna: "San Pablo", provincia: "Osorno", region: "Los Lagos" },
  { comuna: "Chaitén", provincia: "Palena", region: "Los Lagos" },
  { comuna: "Futaleufú", provincia: "Palena", region: "Los Lagos" },
  { comuna: "Hualaihué", provincia: "Palena", region: "Los Lagos" },
  { comuna: "Palena", provincia: "Palena", region: "Los Lagos" },
  {
    comuna: "Coihaique",
    provincia: "Coihaique",
    region: "Aysén del General Carlos Ibáñez del Campo",
  },
  {
    comuna: "Lago Verde",
    provincia: "Coihaique",
    region: "Aysén del General Carlos Ibáñez del Campo",
  },
  {
    comuna: "Aisén",
    provincia: "Aisén",
    region: "Aysén del General Carlos Ibáñez del Campo",
  },
  {
    comuna: "Cisnes",
    provincia: "Aisén",
    region: "Aysén del General Carlos Ibáñez del Campo",
  },
  {
    comuna: "Guaitecas",
    provincia: "Aisén",
    region: "Aysén del General Carlos Ibáñez del Campo",
  },
  {
    comuna: "Cochrane",
    provincia: "Capitán Prat",
    region: "Aysén del General Carlos Ibáñez del Campo",
  },
  {
    comuna: "O'Higgins",
    provincia: "Capitán Prat",
    region: "Aysén del General Carlos Ibáñez del Campo",
  },
  {
    comuna: "Tortel",
    provincia: "Capitán Prat",
    region: "Aysén del General Carlos Ibáñez del Campo",
  },
  {
    comuna: "Chile Chico",
    provincia: "General Carrera",
    region: "Aysén del General Carlos Ibáñez del Campo",
  },
  {
    comuna: "Río Ibáñez",
    provincia: "General Carrera",
    region: "Aysén del General Carlos Ibáñez del Campo",
  },
  {
    comuna: "Punta Arenas",
    provincia: "Magallanes",
    region: "Magallanes y de la Antártica Chilena",
  },
  {
    comuna: "Laguna Blanca",
    provincia: "Magallanes",
    region: "Magallanes y de la Antártica Chilena",
  },
  {
    comuna: "Río Verde",
    provincia: "Magallanes",
    region: "Magallanes y de la Antártica Chilena",
  },
  {
    comuna: "San Gregorio",
    provincia: "Magallanes",
    region: "Magallanes y de la Antártica Chilena",
  },
  {
    comuna: "Cabo de Hornos",
    provincia: "Antártica Chilena",
    region: "Magallanes y de la Antártica Chilena",
  },
  {
    comuna: "Porvenir",
    provincia: "Tierra del Fuego",
    region: "Magallanes y de la Antártica Chilena",
  },
  {
    comuna: "Primavera",
    provincia: "Tierra del Fuego",
    region: "Magallanes y de la Antártica Chilena",
  },
  {
    comuna: "Timaukel",
    provincia: "Tierra del Fuego",
    region: "Magallanes y de la Antártica Chilena",
  },
  {
    comuna: "Natales",
    provincia: "Última Esperanza",
    region: "Magallanes y de la Antártica Chilena",
  },
  {
    comuna: "Torres del Paine",
    provincia: "Última Esperanza",
    region: "Magallanes y de la Antártica Chilena",
  },
  {
    comuna: "Santiago",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Cerrillos",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Cerro Navia",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Conchalí",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "El Bosque",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Estación Central",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Huechuraba",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Independencia",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "La Cisterna",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "La Florida",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "La Granja",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "La Pintana",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "La Reina",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Las Condes",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Lo Barnechea",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Lo Espejo",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Lo Prado",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Macul",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Maipú",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Ñuñoa",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Pedro Aguirre Cerda",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Peñalolén",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Providencia",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Pudahuel",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Quilicura",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Quinta Normal",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Recoleta",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Renca",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "San Joaquín",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "San Miguel",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "San Ramón",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Vitacura",
    provincia: "Santiago",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Puente Alto",
    provincia: "Cordillera",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Pirque",
    provincia: "Cordillera",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "San José de Maipo",
    provincia: "Cordillera",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Colina",
    provincia: "Chacabuco",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Lampa",
    provincia: "Chacabuco",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Tiltil",
    provincia: "Chacabuco",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "San Bernardo",
    provincia: "Maipo",
    region: "Metropolitana de Santiago",
  },
  { comuna: "Buin", provincia: "Maipo", region: "Metropolitana de Santiago" },
  {
    comuna: "Calera de Tango",
    provincia: "Maipo",
    region: "Metropolitana de Santiago",
  },
  { comuna: "Paine", provincia: "Maipo", region: "Metropolitana de Santiago" },
  {
    comuna: "Melipilla",
    provincia: "Melipilla",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Alhué",
    provincia: "Melipilla",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Curacaví",
    provincia: "Melipilla",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "María Pinto",
    provincia: "Melipilla",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "San Pedro",
    provincia: "Melipilla",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Talagante",
    provincia: "Talagante",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "El Monte",
    provincia: "Talagante",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Isla de Maipo",
    provincia: "Talagante",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Padre Hurtado",
    provincia: "Talagante",
    region: "Metropolitana de Santiago",
  },
  {
    comuna: "Peñaflor",
    provincia: "Talagante",
    region: "Metropolitana de Santiago",
  },
  { comuna: "Valdivia", provincia: "Valdivia", region: "Los Ríos" },
  { comuna: "Corral", provincia: "Valdivia", region: "Los Ríos" },
  { comuna: "Lanco", provincia: "Valdivia", region: "Los Ríos" },
  { comuna: "Los Lagos", provincia: "Valdivia", region: "Los Ríos" },
  { comuna: "Máfil", provincia: "Valdivia", region: "Los Ríos" },
  { comuna: "Mariquina", provincia: "Valdivia", region: "Los Ríos" },
  { comuna: "Paillaco", provincia: "Valdivia", region: "Los Ríos" },
  { comuna: "Panguipulli", provincia: "Valdivia", region: "Los Ríos" },
  { comuna: "La Unión", provincia: "Ranco", region: "Los Ríos" },
  { comuna: "Futrono", provincia: "Ranco", region: "Los Ríos" },
  { comuna: "Lago Ranco", provincia: "Ranco", region: "Los Ríos" },
  { comuna: "Río Bueno", provincia: "Ranco", region: "Los Ríos" },
  { comuna: "Arica", provincia: "Arica", region: "Arica y Parinacota" },
  { comuna: "Camarones", provincia: "Arica", region: "Arica y Parinacota" },
  { comuna: "Putre", provincia: "Parinacota", region: "Arica y Parinacota" },
  {
    comuna: "General Lagos",
    provincia: "Parinacota",
    region: "Arica y Parinacota",
  },
  { comuna: "Chillán", provincia: "Diguillín", region: "Ñuble" },
  { comuna: "Bulnes", provincia: "Diguillín", region: "Ñuble" },
  { comuna: "Chillán Viejo", provincia: "Diguillín", region: "Ñuble" },
  { comuna: "El Carmen", provincia: "Diguillín", region: "Ñuble" },
  { comuna: "Pemuco", provincia: "Diguillín", region: "Ñuble" },
  { comuna: "Pinto", provincia: "Diguillín", region: "Ñuble" },
  { comuna: "Quillón", provincia: "Diguillín", region: "Ñuble" },
  { comuna: "San Ignacio", provincia: "Diguillín", region: "Ñuble" },
  { comuna: "Yungay", provincia: "Diguillín", region: "Ñuble" },
  { comuna: "Quirihue", provincia: "Itata", region: "Ñuble" },
  { comuna: "Cobquecura", provincia: "Itata", region: "Ñuble" },
  { comuna: "Coelemu", provincia: "Itata", region: "Ñuble" },
  { comuna: "Ninhue", provincia: "Itata", region: "Ñuble" },
  { comuna: "Portezuelo", provincia: "Itata", region: "Ñuble" },
  { comuna: "Ranquil", provincia: "Itata", region: "Ñuble" },
  { comuna: "Treguaco", provincia: "Itata", region: "Ñuble" },
  { comuna: "San Carlos", provincia: "Punilla", region: "Ñuble" },
  { comuna: "Coihueco", provincia: "Punilla", region: "Ñuble" },
  { comuna: "Ñiquén", provincia: "Punilla", region: "Ñuble" },
  { comuna: "San Fabián", provincia: "Punilla", region: "Ñuble" },
  { comuna: "San Nicolás", provincia: "Punilla", region: "Ñuble" },
];

export const GIS_COLUMNS_TABLE = [
  {
    title: 'Codigo',
    dataIndex: 'codigo',
    key: 'codigo',
  },
  {
    title: 'Rut',
    dataIndex: 'rut',
    key: 'rut',
  },
  {
    title: 'Razón Social',
    dataIndex: 'razon_social',
    key: 'razon_social',
  },
  {
    title: 'Nombre Fantasía',
    dataIndex: 'nombre_fantasia',
    key: 'nombre_fantasia',
  },
  {
    title: 'Email',
    dataIndex: 'email_central',
    key: 'email_central',
  },
  {
    title: 'Categoria',
    dataIndex: 'categoria',
    key: 'categoria',
  },
]

export const INTEREST_GROUP = [
  'Clientes',
  'Empleados',
  'Colaboradores'
];

export const CLIENT_TYPE = [
  'Empresa/Organizacion',
  'Persona Natural'
];

export const COMPANY_CATEGORY = [
  'Microempresa',
  'Pequeña Empresa',
  'Mediana Empresa',
  'Gran Empresa'
];

export const CLIENT_CATEGORY = [
  'Frecuente',
  'Habitual',
  'Ocacional',
  'No Aplica'
];

export const EDUCATION_LEVEL = [
  "Sin educación formal",
  "Básica o primaria",
  "Media científico humanista",
  "Media técnico profesional",
  "Centro formación técnica",
  "Instituto profesional",
  "Universitaria",
  "Postgrado universitario",
  "Sin informacion",
  "No Aplica",
];

export const CIVIL_STATE = [
  "Soltero/a",
  "Comprometido/a",
  "En Relación (más de 1 año noviazgo)",
  "Casado/a",
  "Unión libre o unión de hecho",
  "Separado/a",
  "Divorciado/a",
  "Viudo/a",
  "Noviazgo (período inferior a 1 año)",
];

export const DRIVER_LICENSE = ["A1", "A2", "A3", "A4", "A5", "B", "C", "D", "E", "F"]

export const BLOOD_GROUP = ["O-", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"]

export const PROFESSIONS = [
  "Abogado/a",
  "Académico/a",
  "Adjunto/a",
  "Administrador/a",
  "Administrativo/a",
  "Agrónomo/a",
  "Alergólogo/a",
  "Alergista",
  "Alergólogo/a",
  "Almacenero/a",
  "Almacenista",
  "Anatomista",
  "Anestesiólogo/a",
  "Anestesista",
  "Antologista",
  "Antropólogo/a",
  "Arabista",
  "Archivero/a",
  "Arqueólogo/a",
  "Arquitecto/a",
  "Asesor/a",
  "Asistente/a",
  "Astrofísico/a",
  "Astrólogo/a",
  "Astrónomo/a",
  "Atleta",
  "ATS",
  "Autor/a",
  "Auxiliar",
  "Avicultor/a ",
  "Bacteriólogo/a",
  "Bedel/a",
  "Bibliógrafo/a",
  "Bibliotecario/a",
  "Biofísico/a",
  "Biógrafo/a",
  "Biólogo/a",
  "Bioquímico/a",
  "Botánico/a",
  "Cancerólogo/a",
  "Cardiólogo/a",
  "Cartógrafo/a",
  "Castrador/a",
  "Catedrático/a",
  "Cirujano/a",
  "Citólogo/a",
  "Climatólogo/a",
  "Codirector/a",
  "Comadrón/a",
  "Consejero/a",
  "Conserje",
  "Conservador/a",
  "Coordinador/a",
  "Cosmógrafo/a",
  "Cosmólogo/a",
  "Criminalista",
  "Cronólogo/a",
  "Decano/a",
  "Decorador/a",
  "Defensor/a",
  "Delegado/a",
  "Delineante",
  "Demógrafo/a",
  "Dentista",
  "Dermatólogo/a",
  "Dibujante",
  "Directivo/a",
  "Director/a",
  "Dirigente",
  "Doctor/a",
  "Documentalista",
  "Ecólogo/a",
  "Economista",
  "Educador/a",
  "Egiptólogo/a",
  "Endocrinólogo/a",
  "Enfermero/a",
  "Enólogo/a",
  "Entomólogo/a",
  "Epidemiólogo/a",
  "Especialista",
  "Espeleólogo/a",
  "Estadista",
  "Estadístico/a",
  "Etimólogo/a",
  "Etimologista",
  "Etnógrafo/a",
  "Etnólogo/a",
  "Etólogo/a",
  "Examinador/a",
  "Facultativo/a",
  "Farmacéutico/a",
  "Farmacólogo/a",
  "Filólogo/a",
  "Filósofo/a",
  "Fiscal",
  "Físico/a",
  "Fisiólogo/a",
  "Fisioterapeuta",
  "Fonetista",
  "Foníatra",
  "Fonólogo/a",
  "Forense  ",
  "Fotógrafo/a",
  "Funcionario/a",
  "Gemólogo/a",
  "Genetista",
  "Geobotánica ",
  "Geodesta",
  "Geofísico/a",
  "Geógrafo/a",
  "Geólogo/a",
  "Geomántico/a",
  "Geómetra",
  "Geoquímico/a",
  "Gerente/a",
  "Geriatra",
  "Gerontólogo/a",
  "Gestor/a",
  "Grabador/a",
  "Graduado/a social",
  "Grafólogo/a",
  "Gramático/a",
  "Hematólogo/a",
  "Hepatólogo/a",
  "Hidrogeólogo/a",
  "Hidrógrafo/a",
  "Hidrólogo/a",
  "Higienista",
  "Hispanista",
  "Historiador/a",
  "Homeópata",
  "Informático/a",
  "Ingeniero/a",
  "Ingeniero/a técnico ",
  "Inmunólogo/a",
  "Inspector/a",
  "Interino/a",
  "Interventor/a",
  "Investigador/a ",
  "Jardinero/a",
  "Jefe/a",
  "Juez/a",
  "Latinista",
  "Lector/a",
  "Letrado/a",
  "Lexicógrafo/a",
  "Lexicólogo/a",
  "Licenciado/a",
  "Lingüista",
  "Logopeda",
  "Maestro/a",
  "Matemático/a",
  "Matrón/a",
  "Mecánico/a",
  "Médico/a",
  "Meteorólogo/a",
  "Micólogo/a",
  "Microbiológico/a",
  "Microcirujano/a",
  "Mimógrafo/a",
  "Mineralogista",
  "Monitor/a",
  "Musicólogo/a",
  "Naturópata",
  "Nefrólogo/a",
  "Neumólogo/a",
  "Neuroanatomista",
  "Neurobiólogo/a",
  "Neurocirujano",
  "Neuroembriólogo/a",
  "Neurofisiólogo/a",
  "Neurólogo/a",
  "Nutrólogo/a ",
  "Oceanógrafo/a",
  "Odontólogo/a",
  "Oficial/a",
  "Oficinista",
  "Oftalmólogo/a",
  "Oncólogo/a",
  "Operador/a",
  "Óptico/a",
  "Optometrista",
  "Ordenanza",
  "Orientador/a",
  "Ornitólogo/a",
  "Ortopédico/a",
  "Ortopedista",
  "Osteólogo/a",
  "Osteópata",
  "Otorrinolaringólogo/a",
  "Paleobiólogo/a",
  "Paleobotánico/a",
  "Paleógrafo/a",
  "Paleólogo/a",
  "Paleontólogo/a",
  "Patólogo/a",
  "Pedagogo/a",
  "Pediatra  ",
  "Pedicuro/a",
  "Periodista",
  "Perito/a",
  "Piscicultor/a",
  "Podólogo/a",
  "Portero/a",
  "Prehistoriador/a",
  "Presidente/a",
  "Proctólogo/a",
  "Profesor/a",
  "Programador/a",
  "Protésico/a",
  "Proveedor/a",
  "Psicoanalista",
  "Psicólogo/a",
  "Psicofísico/a",
  "Psicopedagogo/a",
  "Psicoterapeuta",
  "Psiquiatra",
  "Publicista",
  "Publicitario/a",
  "Puericultor/a",
  "Químico/a",
  "Quiropráctico/a",
  "Radioastrónomo/a",
  "Radiofonista",
  "Radiólogo/a",
  "Radiotécnico/a",
  "Radiotelefonista ",
  "Radiotelegrafista",
  "Radioterapeuta",
  "Rector/a",
  "Sanitario/a",
  "Secretario/a",
  "Sexólogo/a",
  "Sismólogo/a",
  "Sociólogo/a",
  "Subdelegado/a",
  "Subdirector/a",
  "Subsecretario/a",
  "Técnico/a",
  "Telefonista",
  "Teólogo/a",
  "Terapeuta",
  "Tocoginecólogo/a",
  "Tocólogo/a",
  "Toxicólogo/a",
  "Traductor/a",
  "Transcriptor/a",
  "Traumatólogo/a",
  "Tutor/a ",
  "Urólogo/a",
  "Veterinario/a",
  "Vicedecano/a",
  "Vicedirector/a",
  "Vicegerente",
  "Vicepresidente/a",
  "Vicerrector/a",
  "Vicesecretario/a ",
  "Virólogo/a",
  "Viticultor/a",
  "Vulcanólogo/a",
  "Xilógrafo/a",
  "Zoólogo/a",
  "Zootécnico/a",
]

export const API_COUNTRIES = 'https://restcountries.eu/rest/v2/all';

//+++++++++++++++++++++++++++++++++++++ REQUEST +++++++++++++++++++++++++
export const PREFIX_REQUEST = '/solicitudes';

export const CATEGORIES_REQUESTS: ICategory1[] = [
  {
    id: 1,
    nivel_1: "Exámen Psicosensotécnico",
    nivel_2: [
      {
        id: 1,
        nivel_2: "Exámen Psicosensotécnico",
        nivel_3: [
          {
            id: 1,
            nivel_3: "Psicosensotécnico",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Psicosensotécnico Riguroso",
              },
              {
                id: 2,
                nivel_4: "Copia",
              },
              {
                id: 3,
                nivel_4: "Credencial",
              },
              {
                id: 4,
                nivel_4: "Psicotécnico",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    nivel_1: "Evaluación Psicológica y Psicolaboral",
    nivel_2: [
      {
        id: 1,
        nivel_2: "Evaluación",
        nivel_3: [
          {
            id: 1,
            nivel_3: "Psicolaboral",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Aversión al Riesgo",
              },
              {
                id: 2,
                nivel_4: "Examen Psicológico de Altura Física",
              },
              {
                id: 3,
                nivel_4: "Examen Psicológico para Rigger",
              },
              {
                id: 4,
                nivel_4: "Evaluación Psicolaboral",
              },
              {
                id: 5,
                nivel_4: "Evaluación Psicolaboral por Competencias",
              },
              {
                id: 6,
                nivel_4: "Evaluación de Puesto de Trabajo (ACHS- EPT)",
              },
              {
                id: 7,
                nivel_4: "Copia",
              },
              {
                id: 8,
                nivel_4: "Credencial",
              },
              {
                id: 9,
                nivel_4: "Evaluación Psicológica para Escolta",
              },
              {
                id: 10,
                nivel_4: "Evaluación Psicológica para Supervisor",
              },
              {
                id: 11,
                nivel_4: "Evaluación Psicológica para Manejo de Explosivos",
              },
              {
                id: 12,
                nivel_4: "Evaluación Psicológica Manejo de Armas",
              },
              {
                id: 13,
                nivel_4: "Evaluación Psicológica Tradicional",
              },
            ],
          },
          {
            id: 2,
            nivel_3: "Psicológica",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Evaluación Psicológica Clínica (ACHS- EP)",
              },
              {
                id: 2,
                nivel_4: "Evaluación Psicológica Clínica",
              },
              {
                id: 3,
                nivel_4: "Copia",
              },
              {
                id: 4,
                nivel_4: "Credencial",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    nivel_1: "Intervención Individual y Grupal",
    nivel_2: [
      {
        id: 1,
        nivel_2: "Intervención",
        nivel_3: [
          {
            id: 1,
            nivel_3: "Psicológica",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Psicoterapia y Trat. Asoc.",
              },
              {
                id: 2,
                nivel_4: "Copia",
              },
              {
                id: 3,
                nivel_4: "Credencial",
              },
              {
                id: 4,
                nivel_4: "Psicoterapia y Trat. Asoc. (ACHS)",
              },
            ],
          },
          {
            id: 2,
            nivel_3: "Coaching",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Coaching de Equipo",
              },
              {
                id: 2,
                nivel_4: "Coaching Ejecutivo",
              },
              {
                id: 3,
                nivel_4: "Coaching de Vida",
              },
              {
                id: 4,
                nivel_4: "Copia",
              },
              {
                id: 5,
                nivel_4: "Credencial",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    nivel_1: "Asesoría",
    nivel_2: [
      {
        id: 1,
        nivel_2: "Asesoría",
        nivel_3: [
          {
            id: 1,
            nivel_3: "Desarrollo Organizacional",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Creación Perfil de Cargo",
              },
              {
                id: 2,
                nivel_4: "Reclutamiento",
              },
              {
                id: 3,
                nivel_4: "Evaluación de Desempeño",
              },
              {
                id: 4,
                nivel_4: "Evaluación de Clima Laboral",
              },
              {
                id: 5,
                nivel_4: "Evaluación de Riesgo Psicosocial",
              },
              {
                id: 6,
                nivel_4: "Copia",
              },
              {
                id: 7,
                nivel_4: "Credencial",
              },
              {
                id: 8,
                nivel_4: "Encuesta Factores de Riesgo Psicosocial",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    nivel_1: "Capacitación",
    nivel_2: [
      {
        id: 1,
        nivel_2: "Capacitación",
        nivel_3: [
          {
            id: 1,
            nivel_3: "Competencias",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Autocuidado y Prevención",
              },
              {
                id: 2,
                nivel_4: "Comunicación Efectiva",
              },
              {
                id: 3,
                nivel_4: "Liderazgo",
              },
              {
                id: 4,
                nivel_4: "Atención de Público y Técnicas de Ventas",
              },
              {
                id: 5,
                nivel_4: "Control de Estrés",
              },
              {
                id: 6,
                nivel_4: "Desarrollo de Autoestima Positiva",
              },
              {
                id: 7,
                nivel_4: "Trabajo en Equipo",
              },
              {
                id: 8,
                nivel_4: "Resiliencia y Tolerancia a la Frustración",
              },
              {
                id: 9,
                nivel_4: "Empowerment y Competencias Laborales",
              },
              {
                id: 10,
                nivel_4: "Estimulación Cognitiva",
              },
              {
                id: 11,
                nivel_4: "Copia",
              },
              {
                id: 12,
                nivel_4: "Credencial",
              },
              {
                id: 13,
                nivel_4: "Curso Manejo de Situaciones Complejas",
              },
              {
                id: 14,
                nivel_4: "Curso Psicología del Conductor",
              },
              {
                id: 15,
                nivel_4: "Relatoría",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    nivel_1: "Certificación",
    nivel_2: [
      {
        id: 1,
        nivel_2: "Certificación",
        nivel_3: [
          {
            id: 1,
            nivel_3: "Personas",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Curso de Trabajo en Altura",
              },
              {
                id: 2,
                nivel_4: "Curso Rigger",
              },
              {
                id: 3,
                nivel_4: "Curso Operador Puente Grúa",
              },
              {
                id: 4,
                nivel_4: "Copia",
              },
              {
                id: 5,
                nivel_4: "Credencial",
              },
              {
                id: 6,
                nivel_4: "Curso Manejo de Aversión al Riesgo",
              },
            ],
          },
          {
            id: 2,
            nivel_3: "Equipos",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Certificación Equipos Izaje",
              },
              {
                id: 2,
                nivel_4: "Certificación Equipos Conducción",
              },
              {
                id: 3,
                nivel_4: "Certificación Equipos Movimiento de Tierra",
              },
              {
                id: 4,
                nivel_4: "Copia",
              },
              {
                id: 5,
                nivel_4: "Credencial",
              },
            ],
          },
          {
            id: 3,
            nivel_3: "Elementos",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Certificación de Elementos de Izaje",
              },
              {
                id: 2,
                nivel_4: "Copia",
              },
              {
                id: 3,
                nivel_4: "Credencial",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    nivel_1: "Venta y Arriendos",
    nivel_2: [
      {
        id: 1,
        nivel_2: "Arriendo",
        nivel_3: [
          {
            id: 1,
            nivel_3: "Muebles",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Equipos",
              },
            ],
          },
          {
            id: 2,
            nivel_3: "Inmuebles",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Oficina",
              },
              {
                id: 2,
                nivel_4: "Sala Capacitación",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        nivel_2: "Venta",
        nivel_3: [
          {
            id: 1,
            nivel_3: "Muebles",
            nivel_4: [
              {
                id: 1,
                nivel_4: "Equipos",
              },
              {
                id: 2,
                nivel_4: "Herramientas",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const REQUESTS_COLUMNS_TABLE = [
  {
    title: 'Codigo solicitud',
    dataIndex: 'codigo',
    key: 'codigo',
  },
  {
    title: 'Fecha solicitud',
    dataIndex: 'fecha_solicitud',
    key: 'fecha_solicitud',
  },
  {
    title: 'Rut CP',
    dataIndex: 'rut_CP',
    key: 'rut_CP',
  },
  {
    title: 'Razon social CP',
    dataIndex: 'razon_social_CP',
    key: 'razon_social_CP',
  },
  {
    title: 'Rut CS',
    dataIndex: 'rut_cs',
    key: 'rut_cs',
  },
  {
    title: 'Razon social CS',
    dataIndex: 'razon_social_cs',
    key: 'razon_social_cs',
  },
  {
    title: 'Nombre servicio',
    dataIndex: 'nombre_servicio',
    key: 'nombre_servicio',
  },
]

export const SERVICES_TYPE = [
  'Presencial',
  'Online'
];

export const SERVICES_PLACE = [
  'Oficina',
  'Terreno'
];

export const SUCURSAL = [
  'Oficina Illapel',
  'Oficina Salamanca'
]