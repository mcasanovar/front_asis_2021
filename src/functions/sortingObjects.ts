export default function sortingObjects(
  arrayObject: any, 
  filter: any,
  ascDesc: string
){
  const aux = arrayObject.sort((a: any, b: any) => {
    if ( a[filter] < b[filter] ){
      return ascDesc === 'asc' ? -1 : 1;
    }
    if ( a[filter] > b[filter] ){
      return ascDesc === 'asc' ? 1 : -1;
    }
    return 0;
  })

  return aux;
}