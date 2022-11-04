import MyComponent from '../../../../slices/Card';

export default {
  title: 'slices/Card'
}


export const _Default = () => <MyComponent slice={{"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":[{"type":"heading4","text":"Obtain","spans":[]}],"body":[{"type":"paragraph","text":"Irure nisi dolore voluptate Lorem labore enim nostrud. Sit duis amet do fugiat non proident.","spans":[]}]},"slice_type":"card","id":"_Default"}} />
_Default.storyName = ''

export const _Image = () => <MyComponent slice={{"variation":"image","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"file":{"dimensions":{"width":1500,"height":1900},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1547082299-de196ea013d6","md":{"dimensions":{"width":750,"height":1000},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1547082299-de196ea013d6"},"sm":{"dimensions":{"width":350,"height":550},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1493119508027-2b584f234d6c"}},"caption":[{"type":"paragraph","text":"Ea ea voluptate ullamco sint quis enim laborum laboris incididunt. In sint magna sunt proident aute. Proident magna commodo ad qui.","spans":[]}]},"slice_type":"card","id":"_Image"}} />
_Image.storyName = ''

export const _Wine = () => <MyComponent slice={{"variation":"wine","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"reference":{"id":"mock_document_id","link_type":"Document","type":"wine","tags":[],"lang":"en-us","slug":null,"first_publication_date":"1970-01-01T00:00:01+0000","last_publication_date":"1970-01-01T01:00:00+0000"}},"slice_type":"card","id":"_Wine"}} />
_Wine.storyName = ''

export const _ImageWithInternalLink = () => <MyComponent slice={{"variation":"imageWithInternalLink","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"file":{"dimensions":{"width":1500,"height":1900},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1537498425277-c283d32ef9db","md":{"dimensions":{"width":750,"height":1000},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f"},"sm":{"dimensions":{"width":350,"height":550},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2"}},"link":{"id":"mock_document_id","link_type":"Document","type":"producer","tags":[],"lang":"en-us","slug":null,"first_publication_date":"1970-01-01T00:00:01+0000","last_publication_date":"1970-01-01T01:00:00+0000"}},"slice_type":"card","id":"_ImageWithInternalLink"}} />
_ImageWithInternalLink.storyName = ''
