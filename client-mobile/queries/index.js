import { useLazyQuery, gql } from "@apollo/client";

export const GET_POST = gql`
  query Posts {
    posts {
    id
    title
    slug
    content
    imgUrl
    categoryId
    authorId
    authorName
    Tags {
      id
      name
      name2
      name3
      postId
    }
    Category {
      id
      name
    
  }
  }
}
`;

export const DETAIL_POST = gql`
query UserDetail($postDetailId: ID!) {
  postDetail(id: $postDetailId) {
    id
    title
    slug
    content
    imgUrl
    categoryId
    authorId
    authorName
    
  }
}
`

export const POST_BY_CATEGORY = gql`
query PostByCategory($postByCategoryId: ID!) {
  postByCategory(id: $postByCategoryId) {
    id
    title
    slug
    content
    imgUrl
    categoryId
    authorId
    authorName
    Category {
      id
      name
    }
    Tags {
      id
      name
      name2
      name3
      postId
    }
  }
}
`

export const GET_CATEGORY = gql`
query PostByCategory {
  categories {
    id
    name
  }
}
`



