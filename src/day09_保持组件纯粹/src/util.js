export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  )
}

export const ArrayNotEmpty = (val) =>
  Array.isArray(val) && val.length > 0
