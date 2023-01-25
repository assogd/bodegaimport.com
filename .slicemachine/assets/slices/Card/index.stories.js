import MyComponent from '../../../../slices/Card';

export default {
  title: 'slices/Card'
}


export const _Default = () => <MyComponent slice={{"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":[{"type":"heading4","text":"Examine","spans":[]}],"body":[{"type":"paragraph","text":"Enim commodo pariatur laboris nisi commodo fugiat cillum id voluptate aliqua. Occaecat minim sunt nulla laborum id minim ipsum sunt laboris in sit id aute sunt qui. In occaecat officia excepteur nostrud culpa.","spans":[]}]},"slice_type":"card","id":"_Default"}} />
_Default.storyName = ''

export const _Image = () => <MyComponent slice={{"variation":"image","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"file":{"dimensions":{"width":1500,"height":1900},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2","md":{"dimensions":{"width":750,"height":1000},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1589652717521-10c0d092dea9"},"sm":{"dimensions":{"width":350,"height":550},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1596195689404-24d8a8d1c6ea"}},"caption":[{"type":"paragraph","text":"Minim labore eu consequat commodo veniam excepteur tempor incididunt magna ut magna ad qui incididunt. Ad dolore ut sint ea aute. Consequat ex non culpa id minim laborum amet cupidatat non.","spans":[]}]},"slice_type":"card","id":"_Image"}} />
_Image.storyName = ''

export const _Wine = () => <MyComponent slice={{"variation":"wine","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"reference":{"id":"mock_document_id","link_type":"Document","type":"wine","tags":[],"lang":"en-us","slug":null,"first_publication_date":"1970-01-01T00:00:01+0000","last_publication_date":"1970-01-01T01:00:00+0000"}},"slice_type":"card","id":"_Wine"}} />
_Wine.storyName = ''

export const _ImageWithInternalLink = () => <MyComponent slice={{"variation":"imageWithInternalLink","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"file":{"dimensions":{"width":1500,"height":1900},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1504198070170-4ca53bb1c1fa","md":{"dimensions":{"width":750,"height":1000},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1589321578146-4c1ba445cc88"},"sm":{"dimensions":{"width":350,"height":550},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1498050108023-c5249f4df085"}},"link":{"id":"mock_document_id","link_type":"Document","type":"producer","tags":[],"lang":"en-us","slug":null,"first_publication_date":"1970-01-01T00:00:01+0000","last_publication_date":"1970-01-01T01:00:00+0000"}},"slice_type":"card","id":"_ImageWithInternalLink"}} />
_ImageWithInternalLink.storyName = ''

export const _MultipleImages = () => <MyComponent slice={{"variation":"multipleImages","version":"sktwi1xtmkfgx8626","items":[{"file":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1544731612-de7f96afe55f","portrait_lg":{"dimensions":{"width":1500,"height":1900},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1589652717521-10c0d092dea9"},"portrait_md":{"dimensions":{"width":750,"height":1000},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1579931794097-0ad001e51edb"},"portrait_sm":{"dimensions":{"width":350,"height":550},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1587653915936-5623ea0b949a"},"landscape_lg":{"dimensions":{"width":2000,"height":1500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1607582278038-6bebbd4d7b72"}},"caption":[{"type":"paragraph","text":"Anim sunt nostrud reprehenderit incididunt eiusmod aliquip consectetur nisi duis anim est.","spans":[]}]}],"primary":{},"slice_type":"card","id":"_MultipleImages"}} />
_MultipleImages.storyName = ''
